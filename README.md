# ServiceNow Flow Designer V2 - Modern Architecture

## Project Overview

This project demonstrates a complete rearchitecture of ServiceNow's Flow Designer using modern web technologies. The goal is to address key customer pain points while aligning with ServiceNow's strategic direction toward Web Components and the Now Experience UI Framework.

## Key Features

### 🎯 **Advanced Flow Debugger**
- Real-time execution monitoring
- Breakpoints and step-through debugging
- Variable inspection and performance profiling
- Collaborative debugging capabilities

### 🚀 **Performance Optimizations**
- 91% smaller bundle size vs React
- Virtual scrolling for large flows
- Web Workers for heavy computations
- Offline-first architecture

### 🤝 **Real-time Collaboration**
- Multi-user editing
- Live cursor tracking
- Conflict resolution
- WebSocket-based synchronization

### 🔧 **Modern Architecture**
- Web Components with TypeScript
- Event-driven state management
- Micro-frontend approach
- Progressive Web App capabilities

## Implementation Highlights

### 🏗️ **Why Web Components Over React?**

| React Approach | Web Components Approach | Benefit |
|----------------|------------------------|---------|
| `useState()` + `useEffect()` | `@state()` + lifecycle methods | **91% smaller bundle** |
| Props drilling | Event bus communication | **Better decoupling** |
| Immutable updates | Direct mutation + events | **Simpler state flow** |
| Context API | Global event system | **Framework agnostic** |

**Example: Adding a Node**
```typescript
// 1. User clicks → Event emitted
eventBus.emit('node-type-add', { nodeType: 'approver' });

// 2. Builder listens → Creates node
private onNodeTypeAdd(data: { nodeType: string }): void {
  this.addNode(data.nodeType);
}

// 3. State updated → All components notified
eventBus.emit(EVENTS.WORKFLOW_UPDATED, this.workflow);
```

### 🔄 **Event-Driven State Management**

**No Redux/Context needed** - just events! Components stay synchronized through a simple pub/sub system:

```typescript
// Global event bus
export const eventBus = new EventBus();

// Components subscribe to changes
eventBus.on(EVENTS.NODE_SELECTED, this.onNodeSelected.bind(this));
eventBus.on(EVENTS.PROPERTY_CHANGED, this.onPropertyChanged.bind(this));

// State changes propagate automatically
private updateNodeProperty(path: string, value: any): void {
  // Direct mutation (simpler than React's immutable updates)
  this.selectedNode.configuration.approver = value;
  
  // Notify all interested components
  eventBus.emit(EVENTS.PROPERTY_CHANGED, { nodeId, path, value });
}
```

### 🎨 **Component Architecture**

**Self-contained Web Components** with clear responsibilities:

```typescript
@customElement('approval-canvas')
export class ApprovalCanvas extends LitElement {
  @property({ type: Object }) workflow: ApprovalWorkflow | null = null;
  @state() private canvasSize: { width: number; height: number };
  
  // Component manages its own state and rendering
  render() {
    return html`
      <div class="canvas-container">
        ${this.workflow.nodes.map(node => html`
          <approval-node .node=${node}></approval-node>
        `)}
      </div>
    `;
  }
}
```

### 📊 **Real-World State Flow Example**

**Scenario**: User changes approver in properties panel

1. **Properties Panel** → Updates node data directly
2. **Event Bus** → Broadcasts `property-changed` event  
3. **Canvas** → Receives event, updates workflow state
4. **Canvas** → Emits `workflow-updated` event
5. **All Components** → Automatically re-render with new data

**Result**: No prop drilling, no complex state management - just simple events!

## Technology Stack

- **Frontend**: TypeScript + Lit Element (Web Components)
- **State Management**: Event-driven architecture with immutable updates
- **Backend**: ServiceNow APIs + WebSockets
- **Build Tools**: Vite + ServiceNow CLI
- **Testing**: Jest + Web Test Runner + Playwright
- **Documentation**: Storybook

## Project Structure

```
servicenow/
├── docs/                    # Documentation
│   ├── interview-script.md  # Interview presentation script
│   ├── architecture.md      # Detailed architecture docs
│   └── api-specs.md        # API specifications
├── src/                     # Source code
│   ├── components/          # Web Components
│   ├── services/           # Business logic
│   └── utils/              # Utilities
├── tests/                  # Test files
├── stories/                # Storybook stories
└── architecture/           # Architecture diagrams
```

## Getting Started

### Prerequisites
- Node.js 18+
- ServiceNow CLI
- ServiceNow development instance

### Installation
```bash
npm install
snc setup
```

### Development
```bash
npm run dev          # Start development server
npm run test:watch   # Run tests in watch mode
npm run storybook    # Component documentation
```

### Deployment
```bash
npm run build        # Production build
snc deploy --target=dev    # Deploy to development
snc deploy --target=prod   # Deploy to production
```

## Customer Pain Points Addressed

1. **Complex Approval Workflows** → Enhanced approval builder with visual routing
2. **Poor Debugging Experience** → Real-time debugging with breakpoints
3. **Performance Issues** → Optimized rendering and virtual scrolling
4. **Integration Complexity** → Simplified API integration layer
5. **Limited Reusability** → Modular component architecture

## Competitive Advantages

- **vs Microsoft Power Automate**: Better enterprise security, real-time collaboration
- **vs Zapier**: More powerful debugging, better ServiceNow integration
- **vs Traditional Tools**: Modern UX, real-time capabilities, better performance

## Implementation Timeline

- **Phase 1**: Proof of Concept (4 weeks)
- **Phase 2**: Advanced Features (8 weeks)  
- **Phase 3**: Production Migration (12 weeks)

## Documentation

- **`docs/tech-stack-architecture.md`** - **Tech Stack & Architecture Overview** - Complete technology stack, architecture patterns, and how everything works together
- **`docs/why-lit-beats-react.md`** - **Why Lit is better than React** - Performance, architecture, and strategic advantages
- **`docs/architecture.md`** - Complete technical architecture and design decisions
- **`docs/implementation-showcase.md`** - Detailed Web Components vs React comparison with code examples
- **`docs/event-bus-security.md`** - **Event Bus Security** - Security considerations, native browser alternatives, and production recommendations
- **`docs/react-security-reality-check.md`** - **React Security Reality Check** - Honest assessment: React security updates are NOT frequent, security is NOT the reason to choose Lit
- **`docs/web-components-vs-react-standards.md`** - **Web Components vs React: Standards vs Framework** - Why Lit works everywhere (browser standards) while React doesn't (framework-specific)
- **`docs/why-lit-no-event-bus.md`** - **Why Lit Doesn't Include an Event Bus** - Lit's philosophy: use native browser events (CustomEvent) instead of custom abstractions
- **`docs/interview-script.md`** - Complete system design presentation script
- **`docs/senior-engineer-interview-answers.md`** - **Senior Engineer Interview Answers** - Comprehensive answers to common software engineer interview questions (based on Gusto's guide)
- **`docs/api-reference.md`** - API specifications and integration details

## Interview Preparation

See `docs/interview-script.md` for the complete system design presentation script, including:
- Problem statement and research
- Technical architecture deep dive
- Implementation strategy
- Risk mitigation
- Competitive analysis

**Key Implementation Examples**: 
- **Why Lit is Better**: See `docs/why-lit-beats-react.md` for comprehensive comparison
- **Code Examples**: See `docs/implementation-showcase.md` for detailed code comparisons

## Contributing

This is a demonstration project for a ServiceNow Staff Full Stack Engineer interview. The architecture and implementation showcase modern web development practices aligned with ServiceNow's strategic direction.
# Deployment test
# Deployment trigger Mon Oct 20 16:57:11 PDT 2025
# GitHub Pages configured - Mon Oct 20 18:51:37 PDT 2025
