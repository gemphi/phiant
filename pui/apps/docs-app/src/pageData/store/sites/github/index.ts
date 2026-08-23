/* ---------- GitHub data store ----------
 * Comprehensive data keyed by dataSource strings.
 * Page blocks reference these via `dataSource: 'github.xxx'`.
 */

export type GithubRepo = {
  id: string;
  name: string;
  owner: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
  updated: string;
  isPrivate: boolean;
};

export type GithubRepoDetail = {
  id: string;
  name: string;
  owner: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
  watchers: string;
  contributors: string;
  isPrivate: boolean;
};

export type GithubIssue = {
  id: string;
  number: number;
  title: string;
  author: string;
  avatar: string;
  state: 'open' | 'closed';
  labels: string[];
  comments: number;
  created: string;
};

export type GithubIssueComment = {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
};

export type GithubPull = {
  id: string;
  number: number;
  title: string;
  author: string;
  avatar: string;
  state: 'open' | 'merged' | 'closed';
  branch: string;
  additions: number;
  deletions: number;
  updated: string;
};

export type GithubCommit = {
  id: string;
  hash: string;
  message: string;
  author: string;
  avatar: string;
  time: string;
};

export type GithubUser = {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  followers: string;
  repos: number;
};

export type GithubNotification = {
  id: string;
  type: string;
  text: string;
  repo: string;
  time: string;
};

export type GithubTrending = {
  id: string;
  name: string;
  owner: string;
  description: string;
  language: string;
  starsToday: string;
};

export const GITHUB_DATA: Record<string, any> = {
  /* 1. Repos */
  'github.repos': [
    { id: 'r1', name: 'spanner-query-optimizer', owner: 'sarahchen', description: 'Distributed query optimization engine for Cloud Spanner with adaptive plan caching.', language: 'Go', stars: '1,247', forks: '89', updated: '2 hours ago', isPrivate: false },
    { id: 'r2', name: 'design-system-tokens', owner: 'sarahchen', description: 'Design token pipeline with Style Dictionary, Figma sync, and multi-brand theming.', language: 'TypeScript', stars: '342', forks: '23', updated: '1 day ago', isPrivate: true },
    { id: 'r3', name: 'vite-migration-playbook', owner: 'sarahchen', description: 'Step-by-step playbook for migrating 200+ microservices from Webpack to Vite.', language: 'Markdown', stars: '3,451', forks: '187', updated: '3 days ago', isPrivate: false },
    { id: 'r4', name: 'grpc-load-balancer', owner: 'sarahchen', description: 'Adaptive gRPC load balancer with circuit breaker and retry policies.', language: 'Go', stars: '567', forks: '34', updated: '5 days ago', isPrivate: false },
    { id: 'r5', name: 'feature-flags-go', owner: 'sarahchen', description: 'Feature flag system handling 2B evaluations per day with sub-millisecond latency.', language: 'Go', stars: '4,210', forks: '256', updated: '1 week ago', isPrivate: false },
    { id: 'r6', name: 'react-query-cache', owner: 'sarahchen', description: 'Client-side query cache with optimistic updates and offline support.', language: 'TypeScript', stars: '890', forks: '45', updated: '2 weeks ago', isPrivate: false },
    { id: 'r7', name: 'k8s-autoscaler', owner: 'sarahchen', description: 'Custom Kubernetes autoscaler based on queue depth and request latency.', language: 'Go', stars: '1,123', forks: '67', updated: '1 week ago', isPrivate: false },
    { id: 'r8', name: 'observability-toolkit', owner: 'sarahchen', description: 'OpenTelemetry-based observability toolkit with trace correlation.', language: 'Rust', stars: '2,345', forks: '134', updated: '4 days ago', isPrivate: false },
    { id: 'r9', name: 'postgres-partitioner', owner: 'sarahchen', description: 'Automated PostgreSQL table partitioning with time and hash strategies.', language: 'Python', stars: '456', forks: '28', updated: '3 weeks ago', isPrivate: false },
    { id: 'r10', name: 'ci-cache-action', owner: 'sarahchen', description: 'GitHub Action for intelligent CI caching with content-addressable storage.', language: 'TypeScript', stars: '789', forks: '41', updated: '1 week ago', isPrivate: false },
    { id: 'r11', name: 'dotfiles', owner: 'sarahchen', description: 'My development environment configuration — Neovim, tmux, zsh.', language: 'Shell', stars: '123', forks: '12', updated: '1 month ago', isPrivate: false },
    { id: 'r12', name: 'internal-tools-dashboard', owner: 'sarahchen', description: 'Internal developer tools dashboard with service health and on-call rotation.', language: 'TypeScript', stars: '67', forks: '8', updated: '2 days ago', isPrivate: true },
  ] as GithubRepo[],

  /* 2. Repo detail */
  'github.repo.detail': {
    id: 'r1',
    name: 'spanner-query-optimizer',
    owner: 'sarahchen',
    description: 'Distributed query optimization engine for Cloud Spanner with adaptive plan caching.',
    language: 'Go',
    stars: '1,247',
    forks: '89',
    watchers: '34',
    contributors: '23',
    isPrivate: false,
  } as GithubRepoDetail,

  /* 2b. Repo stats — flat array for item templates */
  'github.repo.stats': [
    { label: 'Stars', value: '1,247' },
    { label: 'Forks', value: '89' },
    { label: 'Watching', value: '34' },
    { label: 'Contributors', value: '23' },
  ],

  /* 3. Issues with comments */
  'github.repo.issues': [
    { id: 'i1', number: 142, title: 'Plan cache returns stale results after schema migration', author: 'jameswhitfield', avatar: 'https://i.pravatar.cc/150?img=12', state: 'open', labels: ['bug', 'High Priority', 'optimizer', 'cache'], comments: 8, created: '3 days ago' },
    { id: 'i2', number: 141, title: 'Histogram overflow on large joins causes bad plans', author: 'davidchen', avatar: 'https://i.pravatar.cc/150?img=33', state: 'open', labels: ['bug', 'optimizer'], comments: 5, created: '5 days ago' },
    { id: 'i3', number: 140, title: 'Add support for correlated subquery decorrelation', author: 'priyanair', avatar: 'https://i.pravatar.cc/150?img=51', state: 'open', labels: ['enhancement', 'optimizer'], comments: 12, created: '1 week ago' },
    { id: 'i4', number: 139, title: 'Statistics aggregation is O(n) for large tables', author: 'sofiamartinez', avatar: 'https://i.pravatar.cc/150?img=25', state: 'closed', labels: ['performance', 'statistics'], comments: 7, created: '1 week ago' },
    { id: 'i5', number: 138, title: 'Cost model does not account for network latency between regions', author: 'marcusreed', avatar: 'https://i.pravatar.cc/150?img=60', state: 'open', labels: ['enhancement', 'cost-model'], comments: 9, created: '2 weeks ago' },
    { id: 'i6', number: 137, title: 'Add EXPLAIN ANALYZE output format for debugging', author: 'graceliu', avatar: 'https://i.pravatar.cc/150?img=32', state: 'closed', labels: ['feature', 'tooling'], comments: 4, created: '2 weeks ago' },
    { id: 'i7', number: 136, title: 'Cache eviction policy does not respect memory limits', author: 'ravikumar', avatar: 'https://i.pravatar.cc/150?img=15', state: 'open', labels: ['bug', 'cache'], comments: 3, created: '2 weeks ago' },
    { id: 'i8', number: 135, title: 'Pluggable optimizer rules should support hot-reload', author: 'emmastone', avatar: 'https://i.pravatar.cc/150?img=20', state: 'open', labels: ['enhancement', 'rules'], comments: 6, created: '3 weeks ago' },
    { id: 'i9', number: 134, title: 'Join reordering produces invalid plans for outer joins', author: 'tomhardy', avatar: 'https://i.pravatar.cc/150?img=13', state: 'closed', labels: ['bug', 'optimizer'], comments: 11, created: '3 weeks ago' },
    { id: 'i10', number: 133, title: 'Add benchmarks for TPC-H queries at scale factor 100', author: 'aishakhan', avatar: 'https://i.pravatar.cc/150?img=44', state: 'open', labels: ['testing', 'benchmarks'], comments: 2, created: '3 weeks ago' },
    { id: 'i11', number: 132, title: 'Distributed statistics collection fails on partitioned tables', author: 'liamobrien', avatar: 'https://i.pravatar.cc/150?img=53', state: 'open', labels: ['bug', 'statistics'], comments: 4, created: '1 month ago' },
    { id: 'i12', number: 131, title: 'Document the cost model parameters in the README', author: 'yukitanaka', avatar: 'https://i.pravatar.cc/150?img=23', state: 'closed', labels: ['documentation'], comments: 1, created: '1 month ago' },
    { id: 'i13', number: 130, title: 'Adaptive plan caching should support per-query TTL', author: 'chrisevans', avatar: 'https://i.pravatar.cc/150?img=57', state: 'open', labels: ['enhancement', 'cache'], comments: 5, created: '1 month ago' },
    { id: 'i14', number: 129, title: 'Optimizer picks nested loop join when hash join is 10x faster', author: 'oliviabrown', avatar: 'https://i.pravatar.cc/150?img=36', state: 'closed', labels: ['bug', 'optimizer'], comments: 8, created: '1 month ago' },
    { id: 'i15', number: 128, title: 'Add Prometheus metrics for cache hit/miss ratio', author: 'diegosantos', avatar: 'https://i.pravatar.cc/150?img=68', state: 'closed', labels: ['feature', 'observability'], comments: 3, created: '1 month ago' },
  ] as GithubIssue[],

  /* Issue comments for issue #142 */
  'github.repo.issue.comments': [
    { id: 'ic1', author: 'sarahchen', avatar: 'https://i.pravatar.cc/150?img=47', text: 'Good catch. The cache invalidation hook is registered for DDL events but the schema version check is missing in the cache lookup path. I will push a fix to add a schema version fingerprint to each cache entry.', time: '2 days ago' },
    { id: 'ic2', author: 'davidchen', avatar: 'https://i.pravatar.cc/150?img=33', text: 'I can reproduce this on v2.3.0 as well. The issue is that the DDL event subscriber runs asynchronously and there is a race between the cache invalidation and the next query. We should make the invalidation synchronous for schema changes.', time: '2 days ago' },
    { id: 'ic3', author: 'priyanair', avatar: 'https://i.pravatar.cc/150?img=51', text: '+1 on making it synchronous. We hit this in production last week during a migration and had to manually flush the cache. The fix should also add a metric for cache invalidation events so we can monitor this going forward.', time: '1 day ago' },
    { id: 'ic4', author: 'sarahchen', avatar: 'https://i.pravatar.cc/150?img=47', text: 'Opened PR #145 with the fix. Schema version is now part of the cache key and invalidation is synchronous for DDL events. Added the invalidation metric as well. Running benchmarks now.', time: '1 day ago' },
    { id: 'ic5', author: 'jameswhitfield', avatar: 'https://i.pravatar.cc/150?img=12', text: 'Tested the PR on our staging cluster — works perfectly. The index scan kicks in immediately after the migration now. Great work!', time: '20 hours ago' },
    { id: 'ic6', author: 'marcusreed', avatar: 'https://i.pravatar.cc/150?img=60', text: 'Benchmark numbers look great. p99 latency dropped 15% on the affected queries. Approving the PR.', time: '15 hours ago' },
    { id: 'ic7', author: 'sarahchen', avatar: 'https://i.pravatar.cc/150?img=47', text: 'Merged #145. Will cut v2.5.0 with this fix by end of week. Closing this issue.', time: '10 hours ago' },
    { id: 'ic8', author: 'jameswhitfield', avatar: 'https://i.pravatar.cc/150?img=12', text: 'Thank you for the quick turnaround! Upgrading to v2.5.0 as soon as it is released.', time: '5 hours ago' },
  ] as GithubIssueComment[],

  /* 4. Pull requests */
  'github.repo.pulls': [
    { id: 'pr1', number: 145, title: 'fix: synchronous schema invalidation for plan cache', author: 'sarahchen', avatar: 'https://i.pravatar.cc/150?img=47', state: 'merged', branch: 'fix/cache-invalidation', additions: 234, deletions: 12, updated: '10 hours ago' },
    { id: 'pr2', number: 144, title: 'feat: add EXPLAIN ANALYZE output format', author: 'graceliu', avatar: 'https://i.pravatar.cc/150?img=32', state: 'merged', branch: 'feat/explain-analyze', additions: 456, deletions: 23, updated: '2 weeks ago' },
    { id: 'pr3', number: 143, title: 'perf: batch statistics aggregation', author: 'priyanair', avatar: 'https://i.pravatar.cc/150?img=51', state: 'merged', branch: 'perf/batch-stats', additions: 178, deletions: 89, updated: '2 days ago' },
    { id: 'pr4', number: 142, title: 'refactor: extract cost model into separate package', author: 'davidchen', avatar: 'https://i.pravatar.cc/150?img=33', state: 'merged', branch: 'refactor/cost-model', additions: 567, deletions: 423, updated: '1 day ago' },
    { id: 'pr5', number: 141, title: 'fix: histogram overflow on large joins', author: 'davidchen', avatar: 'https://i.pravatar.cc/150?img=33', state: 'merged', branch: 'fix/histogram-overflow', additions: 45, deletions: 12, updated: '5 hours ago' },
    { id: 'pr6', number: 140, title: 'feat: pluggable optimizer rules with hot-reload', author: 'emmastone', avatar: 'https://i.pravatar.cc/150?img=20', state: 'open', branch: 'feat/hot-reload-rules', additions: 312, deletions: 8, updated: '3 days ago' },
    { id: 'pr7', number: 139, title: 'feat: add Prometheus metrics for cache hit/miss', author: 'diegosantos', avatar: 'https://i.pravatar.cc/150?img=68', state: 'merged', branch: 'feat/prometheus-metrics', additions: 89, deletions: 4, updated: '1 month ago' },
    { id: 'pr8', number: 138, title: 'fix: join reordering for outer joins', author: 'tomhardy', avatar: 'https://i.pravatar.cc/150?img=13', state: 'merged', branch: 'fix/outer-join-reorder', additions: 234, deletions: 156, updated: '3 weeks ago' },
    { id: 'pr9', number: 137, title: 'feat: per-query TTL for adaptive plan cache', author: 'chrisevans', avatar: 'https://i.pravatar.cc/150?img=57', state: 'open', branch: 'feat/cache-ttl', additions: 123, deletions: 5, updated: '1 week ago' },
    { id: 'pr10', number: 136, title: 'test: add TPC-H benchmarks at scale factor 100', author: 'aishakhan', avatar: 'https://i.pravatar.cc/150?img=44', state: 'open', branch: 'test/tpc-h-benchmarks', additions: 456, deletions: 0, updated: '4 days ago' },
  ] as GithubPull[],

  /* 5. Commits */
  'github.repo.commits': [
    { id: 'cm1', hash: 'a3f2b1c', message: 'feat: add adaptive plan cache eviction policy', author: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=47', time: '2 hours ago' },
    { id: 'cm2', hash: 'd8e4c7a', message: 'fix: histogram overflow on large joins', author: 'James Whitfield', avatar: 'https://i.pravatar.cc/150?img=12', time: '5 hours ago' },
    { id: 'cm3', hash: 'f1b2a3d', message: 'refactor: extract cost model into separate package', author: 'David Chen', avatar: 'https://i.pravatar.cc/150?img=33', time: '1 day ago' },
    { id: 'cm4', hash: 'e9c8d7f', message: 'perf: batch statistics aggregation', author: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=51', time: '2 days ago' },
    { id: 'cm5', hash: 'b4a5c6e', message: 'docs: update optimizer rules guide', author: 'Sofia Martinez', avatar: 'https://i.pravatar.cc/150?img=25', time: '3 days ago' },
    { id: 'cm6', hash: 'c7d8e9f', message: 'feat: add Prometheus metrics for cache hit/miss ratio', author: 'Diego Santos', avatar: 'https://i.pravatar.cc/150?img=68', time: '4 days ago' },
    { id: 'cm7', hash: 'a1b2c3d', message: 'fix: join reordering for outer joins', author: 'Tom Hardy', avatar: 'https://i.pravatar.cc/150?img=13', time: '5 days ago' },
    { id: 'cm8', hash: 'e4f5a6b', message: 'test: add integration tests for distributed stats collection', author: 'Aisha Khan', avatar: 'https://i.pravatar.cc/150?img=44', time: '6 days ago' },
    { id: 'cm9', hash: 'd3e4f5a', message: 'feat: add EXPLAIN ANALYZE output format', author: 'Grace Liu', avatar: 'https://i.pravatar.cc/150?img=32', time: '1 week ago' },
    { id: 'cm10', hash: 'c2d3e4f', message: 'fix: cache eviction policy respects memory limits', author: 'Ravi Kumar', avatar: 'https://i.pravatar.cc/150?img=15', time: '1 week ago' },
    { id: 'cm11', hash: 'b1c2d3e', message: 'feat: pluggable optimizer rules interface', author: 'Emma Stone', avatar: 'https://i.pravatar.cc/150?img=20', time: '1 week ago' },
    { id: 'cm12', hash: 'a0b1c2d', message: 'docs: add contributing guidelines and code of conduct', author: 'Yuki Tanaka', avatar: 'https://i.pravatar.cc/150?img=23', time: '2 weeks ago' },
    { id: 'cm13', hash: 'f9e8d7c', message: 'perf: reduce memory allocation in cost model', author: 'Marcus Reed', avatar: 'https://i.pravatar.cc/150?img=60', time: '2 weeks ago' },
    { id: 'cm14', hash: 'e8d7c6b', message: 'fix: statistics collection on partitioned tables', author: 'Liam O\'Brien', avatar: 'https://i.pravatar.cc/150?img=53', time: '2 weeks ago' },
    { id: 'cm15', hash: 'd7c6b5a', message: 'feat: add network latency to cost model', author: 'Olivia Brown', avatar: 'https://i.pravatar.cc/150?img=36', time: '3 weeks ago' },
  ] as GithubCommit[],

  /* 6. Users */
  'github.users': [
    { id: 'u1', username: 'sarahchen', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=47', bio: 'Principal Engineer @ Google Cloud. Distributed systems, query optimization, open source.', followers: '12.4K', repos: 47 },
    { id: 'u2', username: 'jameswhitfield', name: 'James Whitfield', avatar: 'https://i.pravatar.cc/150?img=12', bio: 'Senior Engineering Manager @ Stripe. Payments infrastructure.', followers: '8.7K', repos: 23 },
    { id: 'u3', username: 'sofiamartinez', name: 'Sofia Martinez', avatar: 'https://i.pravatar.cc/150?img=25', bio: 'Product Designer @ Figma. Design systems and component libraries.', followers: '5.6K', repos: 18 },
    { id: 'u4', username: 'davidchen', name: 'David Chen', avatar: 'https://i.pravatar.cc/150?img=33', bio: 'Staff Software Engineer @ Airbnb. Search infrastructure and migrations.', followers: '9.2K', repos: 34 },
    { id: 'u5', username: 'priyanair', name: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=51', bio: 'Engineering Director @ Atlassian. Developer platforms and EM coaching.', followers: '6.1K', repos: 29 },
    { id: 'u6', username: 'marcusreed', name: 'Marcus Reed', avatar: 'https://i.pravatar.cc/150?img=60', bio: 'VP Engineering @ Datadog. Observability and hiring at scale.', followers: '11.3K', repos: 52 },
    { id: 'u7', username: 'graceliu', name: 'Grace Liu', avatar: 'https://i.pravatar.cc/150?img=32', bio: 'Head of Product @ Notion. User research and product strategy.', followers: '4.8K', repos: 12 },
    { id: 'u8', username: 'ravikumar', name: 'Ravi Kumar', avatar: 'https://i.pravatar.cc/150?img=15', bio: 'CTO @ Ramp. Feature flags and financial infrastructure.', followers: '15.6K', repos: 67 },
    { id: 'u9', username: 'emmastone', name: 'Emma Stone', avatar: 'https://i.pravatar.cc/150?img=20', bio: 'Senior Data Scientist @ Spotify. Recommendation systems.', followers: '7.2K', repos: 31 },
    { id: 'u10', username: 'tomhardy', name: 'Tom Hardy', avatar: 'https://i.pravatar.cc/150?img=13', bio: 'Director of Engineering @ Shopify. On-call culture and SRE.', followers: '6.9K', repos: 41 },
  ] as GithubUser[],

  /* 7. Notifications */
  'github.notifications': [
    { id: 'nt1', type: 'comment', text: 'jameswhitfield commented on issue #142', repo: 'stripe/payments-platform', time: '2 hours ago' },
    { id: 'nt2', type: 'pr_opened', text: 'sofiamartinez opened pull request #89', repo: 'figma/design-tools', time: '5 hours ago' },
    { id: 'nt3', type: 'pr_merged', text: 'davidchen merged pull request #234', repo: 'airbnb/search-infra', time: '8 hours ago' },
    { id: 'nt4', type: 'assign', text: 'priyanair assigned you to issue #67', repo: 'atlassian/dev-platform', time: '12 hours ago' },
    { id: 'nt5', type: 'release', text: 'New release: vercel/next.js v15.1.0', repo: 'vercel/next.js', time: '1 day ago' },
    { id: 'nt6', type: 'review', text: 'marcusreed requested your review on PR #145', repo: 'datadog/observability-platform', time: '1 day ago' },
    { id: 'nt7', type: 'mention', text: 'graceliu mentioned you in issue #140', repo: 'notion/core-experience', time: '2 days ago' },
    { id: 'nt8', type: 'star', text: 'ravikumar starred your repository feature-flags-go', repo: 'sarahchen/feature-flags-go', time: '2 days ago' },
    { id: 'nt9', type: 'fork', text: 'emmastone forked your repository spanner-query-optimizer', repo: 'sarahchen/spanner-query-optimizer', time: '3 days ago' },
    { id: 'nt10', type: 'security', text: 'Security alert: vulnerable dependency in design-system-tokens', repo: 'sarahchen/design-system-tokens', time: '3 days ago' },
  ] as GithubNotification[],

  /* 8. Trending */
  'github.trending': [
    { id: 'tr1', name: 'next.js', owner: 'vercel', description: 'The React framework for the web.', language: 'TypeScript', starsToday: '128,234' },
    { id: 'tr2', name: 'typescript', owner: 'microsoft', description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.', language: 'TypeScript', starsToday: '98,765' },
    { id: 'tr3', name: 'tldraw', owner: 'tldraw', description: 'A very good whiteboard SDK for the web.', language: 'TypeScript', starsToday: '34,567' },
    { id: 'tr4', name: 'v', owner: 'vlang', description: 'Simple, fast, safe, compiled language for developing maintainable software.', language: 'V', starsToday: '35,421' },
    { id: 'tr5', name: 'bun', owner: 'oven-sh', description: 'Incredibly fast JavaScript runtime, bundler, test runner, and package manager.', language: 'Zig', starsToday: '72,345' },
    { id: 'tr6', name: 'astro', owner: 'withastro', description: 'The web framework for content-driven websites.', language: 'TypeScript', starsToday: '45,678' },
    { id: 'tr7', name: 'svelte', owner: 'sveltejs', description: 'Cybernetically enhanced web apps.', language: 'TypeScript', starsToday: '78,901' },
    { id: 'tr8', name: 'tauri', owner: 'tauri-apps', description: 'Build smaller, faster, and more secure desktop applications with a web frontend.', language: 'Rust', starsToday: '82,134' },
    { id: 'tr9', name: 'supabase', owner: 'supabase', description: 'The open source Firebase alternative. PostgreSQL, Auth, instant APIs, Edge Functions.', language: 'TypeScript', starsToday: '67,890' },
    { id: 'tr10', name: 'excalidraw', owner: 'excalidraw', description: 'Virtual whiteboard for sketching hand-drawn like diagrams.', language: 'TypeScript', starsToday: '43,210' },
  ] as GithubTrending[],
};
