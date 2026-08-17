# GitHub & GitHub Actions Specification

## 1. Overview

GitHub is the source control and CI/CD backbone for the M-KOPA Agentic Ecosystem. This spec covers repository structure, branching strategy, GitHub Actions workflows for testing, building, deploying agents, and automated quality gates.

## 2. Repository Structure

```
m-kopa-ai-agents/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # Lint, test, type-check on PR
│   │   ├── cd-staging.yml            # Deploy to staging on merge to main
│   │   ├── cd-production.yml         # Deploy to production (manual trigger)
│   │   ├── rag-sync.yml              # Scheduled RAG pipeline sync
│   │   ├── security-scan.yml         # Dependency + secret scanning
│   │   ├── agent-evaluation.yml      # Run agent evaluation suite
│   │   └── infra-plan.yml            # Terraform plan on infra changes
│   ├── CODEOWNERS
│   ├── pull_request_template.md
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.yml
│       ├── feature_request.yml
│       └── agent_request.yml
├── src/                               # Application source code
├── tests/                             # Test suites
├── specs/                             # Specifications (this folder)
├── infra/                             # Terraform IaC
├── scripts/                           # Utility scripts
├── dashboard/                         # Web dashboard
├── data/                              # Local data (git-ignored)
├── docs/                              # User-facing documentation
├── .env.example
├── pyproject.toml
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## 3. Branching Strategy

### Trunk-Based Development

```
main (protected)
  │
  ├── feature/add-onboarding-agent     ← Short-lived feature branches
  ├── feature/rag-hybrid-search
  ├── fix/entra-token-refresh
  ├── infra/add-gpu-compute
  │
  └── release/v1.2.0                   ← Release branches (if needed)
```

### Branch Protection Rules (main)

```yaml
protection_rules:
  required_reviews: 1
  dismiss_stale_reviews: true
  require_code_owner_review: true
  require_status_checks:
    - "ci / lint"
    - "ci / test"
    - "ci / type-check"
    - "security / scan"
  require_linear_history: true
  restrict_pushes: true
  allow_force_pushes: false
  allow_deletions: false
```

### CODEOWNERS

```
# .github/CODEOWNERS
*                           @phiant/ai-ops-team
src/agents/                 @phiant/ai-ops-engineers
src/connectors/             @phiant/ai-ops-engineers @phiant/security
src/rag/                    @phiant/ai-ops-engineers
infra/                      @phiant/ai-ops-lead @phiant/platform-team
specs/                      @phiant/ai-ops-lead
.github/workflows/          @phiant/ai-ops-lead @phiant/platform-team
specs/security.md           @phiant/security
```

## 4. GitHub Actions Workflows

### 4.1 CI Pipeline (`ci.yml`)

Runs on every pull request and push to main.

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    name: Lint & Format
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: "pip"
      - run: pip install ruff mypy
      - run: ruff check src/ tests/
      - run: ruff format --check src/ tests/

  type-check:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: "pip"
      - run: pip install -e ".[dev]"
      - run: mypy src/ --ignore-missing-imports

  test:
    name: Test Suite
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.11", "3.12"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}
          cache: "pip"
      - run: pip install -e ".[dev]"
      - name: Run unit tests
        run: pytest tests/unit/ -v --tb=short --junitxml=test-results.xml
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY_TEST }}
      - name: Run integration tests
        run: pytest tests/integration/ -v --tb=short -m "not slow"
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results-${{ matrix.python-version }}
          path: test-results.xml

  coverage:
    name: Coverage Report
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: "pip"
      - run: pip install -e ".[dev]"
      - run: pytest tests/ --cov=src --cov-report=xml --cov-report=html
      - name: Check coverage threshold
        run: |
          coverage report --fail-under=80
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: htmlcov/
```

### 4.2 CD — Staging (`cd-staging.yml`)

Auto-deploys to staging on merge to main.

```yaml
name: Deploy to Staging

on:
  push:
    branches: [main]
    paths-ignore:
      - "docs/**"
      - "specs/**"
      - "*.md"

jobs:
  build:
    name: Build Container
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    outputs:
      image_tag: ${{ steps.meta.outputs.tags }}
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Docker meta
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}
          tags: |
            type=sha,prefix=staging-
            type=raw,value=staging-latest
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: build
    environment: staging
    steps:
      - uses: actions/checkout@v4
      
      - name: Azure Login
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS_STAGING }}
      
      - name: Deploy to Azure Container Apps
        uses: azure/container-apps-deploy-action@v1
        with:
          containerAppName: phiant-agents-staging
          resourceGroup: rg-phiant-ai-staging
          imageToDeploy: ghcr.io/${{ github.repository }}:staging-latest
          environmentVariables: |
            ANTHROPIC_API_KEY=secretref:anthropic-api-key
            ENVIRONMENT=staging
      
      - name: Run smoke tests
        run: |
          sleep 30  # Wait for deployment
          python scripts/smoke_test.py --url ${{ vars.STAGING_URL }}
      
      - name: Notify on Slack
        if: always()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "Staging deploy ${{ job.status }}: ${{ github.sha }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### 4.3 CD — Production (`cd-production.yml`)

Manual trigger with approval gates.

```yaml
name: Deploy to Production

on:
  workflow_dispatch:
    inputs:
      image_tag:
        description: "Image tag to deploy (e.g., staging-abc1234)"
        required: true
      rollback:
        description: "Rollback to previous version?"
        type: boolean
        default: false

jobs:
  pre-checks:
    name: Pre-deployment Checks
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Verify image exists
        run: |
          docker manifest inspect ghcr.io/${{ github.repository }}:${{ inputs.image_tag }}
      - name: Verify staging tests passed
        run: |
          python scripts/verify_staging_health.py

  deploy:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: pre-checks
    environment: production     # Requires manual approval
    steps:
      - uses: actions/checkout@v4
      
      - name: Azure Login
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS_PROD }}
      
      - name: Blue-Green Deploy (10% canary)
        uses: azure/container-apps-deploy-action@v1
        with:
          containerAppName: phiant-agents-prod
          resourceGroup: rg-phiant-ai-prod
          imageToDeploy: ghcr.io/${{ github.repository }}:${{ inputs.image_tag }}
          trafficWeight: 10
          revisionSuffix: canary
      
      - name: Monitor canary (5 min)
        run: |
          python scripts/monitor_canary.py \
            --duration 300 \
            --error-threshold 0.05 \
            --latency-threshold 5000
      
      - name: Promote to 100%
        if: success()
        run: |
          az containerapp ingress traffic set \
            --name phiant-agents-prod \
            --resource-group rg-phiant-ai-prod \
            --revision-weight latest=100
      
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: v${{ github.run_number }}
          generate_release_notes: true

  rollback:
    name: Rollback (if needed)
    runs-on: ubuntu-latest
    needs: deploy
    if: failure() || inputs.rollback
    steps:
      - name: Azure Login
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS_PROD }}
      
      - name: Rollback to previous revision
        run: |
          az containerapp revision list \
            --name phiant-agents-prod \
            --resource-group rg-phiant-ai-prod \
            --query "[?properties.active].name" -o tsv | head -2 | tail -1 | \
          xargs -I {} az containerapp ingress traffic set \
            --name phiant-agents-prod \
            --resource-group rg-phiant-ai-prod \
            --revision-weight {}=100
```

### 4.4 RAG Sync (`rag-sync.yml`)

Scheduled pipeline to sync knowledge base.

```yaml
name: RAG Knowledge Sync

on:
  schedule:
    - cron: "*/15 * * * *"      # Every 15 minutes
  workflow_dispatch:             # Manual trigger

jobs:
  sync:
    name: Sync Knowledge Base
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -e .
      
      - name: Sync Notion → Vector Store
        run: python -m src.rag.pipeline sync --source notion
        env:
          NOTION_API_KEY: ${{ secrets.NOTION_API_KEY }}
          AZURE_AI_SEARCH_KEY: ${{ secrets.AZURE_AI_SEARCH_KEY }}
          AZURE_AI_SEARCH_ENDPOINT: ${{ vars.AZURE_AI_SEARCH_ENDPOINT }}
      
      - name: Report sync metrics
        if: always()
        run: python -m src.rag.pipeline report --format json
```

### 4.5 Security Scan (`security-scan.yml`)

```yaml
name: Security

on:
  pull_request:
  push:
    branches: [main]
  schedule:
    - cron: "0 6 * * 1"        # Weekly Monday 06:00 UTC

jobs:
  scan:
    name: Security Scan
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    steps:
      - uses: actions/checkout@v4
      
      - name: Dependency audit
        run: pip-audit --strict --desc
      
      - name: Secret scanning
        uses: trufflesecurity/trufflehog@main
        with:
          extra_args: --only-verified
      
      - name: SAST (Semgrep)
        uses: returntocorp/semgrep-action@v1
        with:
          config: p/python p/security-audit
      
      - name: Container scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ghcr.io/${{ github.repository }}:staging-latest
          severity: "CRITICAL,HIGH"
          exit-code: 1
```

### 4.6 Agent Evaluation (`agent-evaluation.yml`)

```yaml
name: Agent Evaluation

on:
  pull_request:
    paths:
      - "src/agents/**"
      - "src/rag/**"
      - "src/orchestrator/**"
  workflow_dispatch:
    inputs:
      eval_suite:
        description: "Evaluation suite to run"
        type: choice
        options:
          - all
          - knowledge
          - routing
          - rag

jobs:
  evaluate:
    name: Run Agent Evaluation
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -e ".[dev]"
      
      - name: Run evaluation suite
        run: |
          python -m tests.evaluation.run \
            --suite ${{ inputs.eval_suite || 'all' }} \
            --output evaluation-report.json
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY_TEST }}
      
      - name: Check thresholds
        run: |
          python -m tests.evaluation.check_thresholds \
            --report evaluation-report.json \
            --config tests/evaluation/thresholds.yaml
      
      - name: Post results to PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = JSON.parse(fs.readFileSync('evaluation-report.json'));
            const body = `## Agent Evaluation Results
            
            | Metric | Score | Threshold | Status |
            |--------|-------|-----------|--------|
            | Intent Routing Accuracy | ${report.routing_accuracy} | 0.95 | ${report.routing_accuracy >= 0.95 ? 'PASS' : 'FAIL'} |
            | RAG Retrieval Recall | ${report.retrieval_recall} | 0.85 | ${report.retrieval_recall >= 0.85 ? 'PASS' : 'FAIL'} |
            | Answer Faithfulness | ${report.faithfulness} | 0.90 | ${report.faithfulness >= 0.90 ? 'PASS' : 'FAIL'} |
            | Avg Latency (ms) | ${report.avg_latency_ms} | 3000 | ${report.avg_latency_ms <= 3000 ? 'PASS' : 'FAIL'} |
            `;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body
            });
      
      - uses: actions/upload-artifact@v4
        with:
          name: evaluation-report
          path: evaluation-report.json
```

### 4.7 Infrastructure Plan (`infra-plan.yml`)

```yaml
name: Infrastructure Plan

on:
  pull_request:
    paths:
      - "infra/**"

jobs:
  plan:
    name: Terraform Plan
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      
      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.9
      
      - name: Azure Login
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS_STAGING }}
      
      - name: Terraform Init
        run: terraform init
        working-directory: infra/
      
      - name: Terraform Plan
        id: plan
        run: terraform plan -no-color -out=tfplan
        working-directory: infra/
      
      - name: Post plan to PR
        uses: actions/github-script@v7
        with:
          script: |
            const output = `${{ steps.plan.outputs.stdout }}`;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## Terraform Plan\n\`\`\`\n${output.substring(0, 10000)}\n\`\`\``
            });
```

## 5. GitHub Environments

| Environment | Protection Rules | Secrets Scope |
|------------|-----------------|---------------|
| `development` | None | Dev API keys |
| `staging` | Auto-deploy on main merge | Staging Azure creds |
| `production` | Manual approval (AI Ops Lead + Director) | Prod Azure creds |

## 6. Secrets Management

### Repository Secrets

| Secret | Used In | Description |
|--------|---------|-------------|
| `ANTHROPIC_API_KEY_TEST` | CI, Evaluation | Test-scoped Anthropic key |
| `AZURE_CREDENTIALS_STAGING` | CD Staging | Azure SP for staging |
| `AZURE_CREDENTIALS_PROD` | CD Production | Azure SP for production |
| `NOTION_API_KEY` | RAG Sync | Notion integration token |
| `AZURE_AI_SEARCH_KEY` | RAG Sync | Azure AI Search admin key |
| `SLACK_WEBHOOK` | Notifications | Slack webhook URL |

### Environment Variables

| Variable | Environment | Value |
|----------|------------|-------|
| `STAGING_URL` | staging | `https://phiant-agents-staging.azurecontainerapps.io` |
| `PROD_URL` | production | `https://phiant-agents.azurecontainerapps.io` |
| `AZURE_AI_SEARCH_ENDPOINT` | all | `https://phiant-ai-search.search.windows.net` |

## 7. Issue & PR Templates

### Agent Request Template

```yaml
# .github/ISSUE_TEMPLATE/agent_request.yml
name: Agent/Automation Request
description: Request a new agent capability or automation
labels: ["agent-request", "triage"]
body:
  - type: dropdown
    id: request-type
    attributes:
      label: Request Type
      options:
        - New Agent
        - New Automation
        - Agent Enhancement
        - Integration Request
    validations:
      required: true
  - type: textarea
    id: problem
    attributes:
      label: Problem Statement
      description: What problem does this solve? Who benefits?
    validations:
      required: true
  - type: textarea
    id: current-process
    attributes:
      label: Current Process
      description: How is this done today? What's the pain point?
  - type: dropdown
    id: priority
    attributes:
      label: Business Priority
      options:
        - Critical (blocking work)
        - High (significant time savings)
        - Medium (nice to have)
        - Low (future improvement)
  - type: input
    id: users-affected
    attributes:
      label: Number of users affected
      placeholder: "e.g., 50 employees in Kenya operations"
```

### Pull Request Template

```markdown
## Summary
<!-- What does this PR do? -->

## Type of Change
- [ ] New agent / capability
- [ ] Bug fix
- [ ] Performance improvement
- [ ] Infrastructure change
- [ ] Documentation

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Agent evaluation suite passes
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No secrets or PII in code
- [ ] Audit logging added for new actions
```

## 8. Dependabot Configuration

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"
    reviewers:
      - "phiant/ai-ops-team"
    labels:
      - "dependencies"
    open-pull-requests-limit: 10
    
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    reviewers:
      - "phiant/ai-ops-lead"
    labels:
      - "ci-cd"
```
