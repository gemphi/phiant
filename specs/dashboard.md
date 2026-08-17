# Dashboard Specification

## 1. Overview

Premium dark-themed web dashboard for real-time monitoring of the M-KOPA Agent Ecosystem. Provides agent status, chat interface, analytics, and audit log viewer.

## 2. Design System

### Color Palette

```css
--bg-primary:     #0a0a0f          /* Deep dark background */
--bg-secondary:   #12121a          /* Card backgrounds */
--bg-tertiary:    #1a1a2e          /* Elevated surfaces */
--accent-primary: #00d4aa          /* M-KOPA teal/green */
--accent-secondary: #6366f1        /* Indigo for secondary actions */
--accent-warning: #f59e0b          /* Amber warnings */
--accent-error:   #ef4444          /* Red errors */
--accent-success: #10b981          /* Green success */
--text-primary:   #e2e8f0          /* Primary text */
--text-secondary: #94a3b8          /* Secondary text */
--text-muted:     #64748b          /* Muted text */
--border:         #1e293b          /* Subtle borders */
--glow:           rgba(0, 212, 170, 0.15)  /* Accent glow */
```

### Typography

- **Headings**: Inter (700)
- **Body**: Inter (400)
- **Code/Metrics**: JetBrains Mono (400)

### Effects

- **Glassmorphism**: `backdrop-filter: blur(12px)` on cards
- **Glow**: Subtle accent-colored glow on active elements
- **Animations**: 200ms ease-out transitions on all interactive elements
- **Gradients**: Linear gradients for status indicators

## 3. Page Layout

```
┌─────────────────────────────────────────────────────┐
│  [=] M-KOPA AI Ops      [Status: * Online]  [User] │
├───────┬─────────────────────────────────────────────┤
│       │                                             │
│  NAV  │              MAIN CONTENT                   │
│       │                                             │
│ DASH  │  ┌─────────────────────────────────────┐    │
│ CHAT  │  │  Dynamic content area based on      │    │
│ AGENT │  │  selected navigation item            │    │
│ AUDIT │  │                                     │    │
│ CONF  │  └─────────────────────────────────────┘    │
│       │                                             │
├───────┴─────────────────────────────────────────────┤
│  Connection: * Live   |  Agents: 6/6   |  v1.0.0   │
└─────────────────────────────────────────────────────┘
```

## 4. Views

### 4.1 Dashboard (Home)

**Purpose**: At-a-glance system overview

**Components**:
- **Status Cards** (top row): Total requests today, active agents, avg response time, success rate
- **Agent Grid**: 6 agent cards showing status, request count, avg latency
- **Live Activity Feed**: Real-time scrolling log of agent actions
- **Request Volume Chart**: Hourly request volume (last 24h)
- **Connector Health**: Status indicators for Entra, Notion, HiBob

### 4.2 Chat Interface

**Purpose**: Interactive chat with the agent ecosystem

**Components**:
- **Message Thread**: Conversation history with agent attribution
- **Input Bar**: Text input with send button
- **Agent Indicator**: Shows which agent is handling the request
- **Source Citations**: Expandable source references for RAG responses
- **Typing Indicator**: Animated dots during agent processing

### 4.3 Agents View

**Purpose**: Detailed agent monitoring and management

**Components**:
- **Agent Cards**: Expanded view of each agent with:
  - Status (healthy/degraded/down)
  - Capabilities list
  - Request metrics (today, this week)
  - Average response time
  - Error rate
  - Last activity timestamp
- **Agent Logs**: Filterable log of recent agent executions

### 4.4 Audit Log

**Purpose**: Compliance and debugging

**Components**:
- **Log Table**: Sortable, filterable table with columns:
  - Timestamp
  - Request ID
  - Agent
  - Action
  - User
  - Status
  - Duration
- **Filters**: Date range, agent, status, user
- **Export**: CSV download

### 4.5 Settings

**Purpose**: Configuration management

**Components**:
- **API Configuration**: API keys, model selection
- **Agent Configuration**: Enable/disable agents, set timeouts
- **Notification Settings**: Alert thresholds
- **Theme Toggle**: Dark/light mode

## 5. Real-time Updates

- **WebSocket connection** to FastAPI for live data
- **Auto-reconnect** with exponential backoff
- **Heartbeat**: Ping every 30 seconds
- **Status indicator** in footer shows connection state

## 6. Responsive Design

- **Desktop**: Full layout with sidebar navigation
- **Tablet**: Collapsible sidebar
- **Mobile**: Bottom navigation bar, stacked cards

## 7. Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigable
- Screen reader compatible
- High contrast mode support
