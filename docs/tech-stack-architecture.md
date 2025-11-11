# Tech Stack & Architecture Overview

## Executive Summary

This document provides a comprehensive overview of the technology stack and architecture for the ServiceNow Flow Designer V2 project. It explains what technologies are used, why they were chosen, and how they work together.

## Technology Stack

### Frontend Framework

**Lit Element 3.0** (Web Components)
- **Version**: 3.0.0
- **Purpose**: Component rendering and reactive UI
- **Why**: 
  - 91% smaller bundle than React (15kb vs 172kb)
  - Aligns with ServiceNow's strategic direction
  - Framework agnostic (works everywhere)
  - Native browser standards (W3C Web Components)

**TypeScript 5.2**
- **Version**: 5.2.2
- **Purpose**: Type safety and developer experience
- **Why**:
  - Catch errors at compile time
  - Better IDE support and autocomplete
  - Self-documenting code
  - Enterprise-grade code quality

### State Management

**Event-Driven Architecture**
- **Pattern**: Pub/Sub with native browser events
- **Implementation**: Custom EventBus (POC) → Native CustomEvent (Production)
- **Why**:
  - No props drilling
  - Better decoupling
  - Simpler than Redux/Context
  - Native browser API (secure, performant)

**Key Files**:
- `src/utils/event-bus.ts` - Custom event bus (POC)
- Components use native `CustomEvent` API for production

### Build Tools

**Vite 4.4**
- **Version**: 4.4.9
- **Purpose**: Build tool and dev server
- **Why**:
  - Fast HMR (Hot Module Replacement)
  - Optimized production builds
  - Native ES modules support
  - Better than Webpack for modern projects

**TypeScript Compiler**
- **Version**: 5.2.2
- **Purpose**: TypeScript to JavaScript compilation
- **Configuration**: `tsconfig.json`

### Development Tools

**ESLint**
- **Version**: 8.49.0
- **Purpose**: Code linting and quality
- **Plugins**: TypeScript ESLint
- **Configuration**: `.eslintrc`

**Jest**
- **Version**: 29.7.0
- **Purpose**: Unit testing
- **Configuration**: `jest.config.js`

### Dependencies

**Core Dependencies**:
```json
{
  "lit": "^3.0.0",                    // Web Components framework
  "@lit/reactive-element": "^2.0.0", // Reactive properties
  "@lit/context": "^1.0.0"           // Context API (optional)
}
```

**Dev Dependencies**:
```json
{
  "typescript": "^5.2.2",            // TypeScript compiler
  "vite": "^4.4.9",                 // Build tool
  "jest": "^29.7.0",                // Testing framework
  "eslint": "^8.49.0"               // Linting
}
```

### Backend Integration

**ServiceNow APIs**
- **REST API**: For CRUD operations
- **GraphQL API**: For complex queries (future)
- **WebSockets**: For real-time collaboration (future)

**Mock API Service**
- **File**: `src/services/mock-api.ts`
- **Purpose**: Simulates ServiceNow APIs for development
- **Production**: Replace with real ServiceNow API calls

## Architecture Overview

### Layered Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│  Web Components (Lit) + TypeScript + Event-Driven State     │
├─────────────────────────────────────────────────────────────┤
│                    STATE MANAGEMENT                          │
│  Event Bus (POC) → Native CustomEvent (Production)        │
├─────────────────────────────────────────────────────────────┤
│                    BUSINESS LOGIC                           │
│  Services + Utilities + Type Definitions                   │
├─────────────────────────────────────────────────────────────┤
│                    INTEGRATION LAYER                         │
│  ServiceNow APIs + WebSockets + Mock Services               │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

**Main Components**:
1. **`approval-builder`** - Main orchestrator component
2. **`approval-canvas`** - Visual canvas for workflow nodes
3. **`approval-node`** - Individual workflow node component
4. **`approval-palette`** - Toolbox for adding nodes
5. **`approval-properties`** - Property panel for node configuration
6. **`connection-layer`** - SVG layer for drawing connections

**Component Hierarchy**:
```
approval-builder (root)
├── approval-palette (left panel)
├── approval-canvas (main area)
│   └── approval-node (multiple instances)
│   └── connection-layer (SVG connections)
└── approval-properties (right panel)
```

### State Management Architecture

**Current (POC)**: Global EventBus
```typescript
// Global singleton
export const eventBus = new EventBus();

// Components emit/listen
eventBus.emit('workflow-updated', workflow);
eventBus.on('workflow-updated', callback);
```

**Recommended (Production)**: Native Browser Events
```typescript
// Native CustomEvent API
this.dispatchEvent(new CustomEvent('workflow-updated', {
  detail: { workflow },
  bubbles: true
}));

// Components listen
this.addEventListener('workflow-updated', callback);
```

**Event Flow**:
1. User action → Component emits event
2. Event bubbles through component tree
3. Parent components listen and update state
4. State changes trigger re-renders

### Data Flow

```
User Interaction
    ↓
Component Event (CustomEvent)
    ↓
Event Bus / Native Events
    ↓
State Update
    ↓
Component Re-render (Lit)
    ↓
UI Update
```

### Project Structure

```
servicenow/
├── src/
│   ├── components/          # Web Components
│   │   ├── approval-builder.ts
│   │   ├── approval-canvas.ts
│   │   ├── approval-node.ts
│   │   ├── approval-palette.ts
│   │   ├── approval-properties.ts
│   │   └── connection-layer.ts
│   ├── services/            # Business logic
│   │   └── mock-api.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── utils/               # Utilities
│   │   └── event-bus.ts
│   └── main.ts              # Entry point
├── docs/                     # Documentation
├── dist/                     # Build output
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite config
└── README.md                 # Project overview
```

## Key Architectural Patterns

### 1. Web Components Pattern

**Custom Elements**:
```typescript
@customElement('approval-node')
export class ApprovalNode extends LitElement {
  @property({ type: Object }) node: ApprovalNode;
  @state() private isSelected = false;
  
  render() {
    return html`<div>${this.node.name}</div>`;
  }
}
```

**Benefits**:
- Standard HTML elements
- Works in any framework
- Encapsulated styling (Shadow DOM)
- Native browser support

### 2. Event-Driven Communication

**Parent-Child Communication**:
```typescript
// Child emits event
this.dispatchEvent(new CustomEvent('node-selected', {
  detail: { nodeId: this.node.id },
  bubbles: true
}));

// Parent listens
this.addEventListener('node-selected', this.onNodeSelected);
```

**Benefits**:
- No props drilling
- Loose coupling
- Standard browser API
- Better security (scoped)

### 3. Reactive Properties

**Lit Reactive System**:
```typescript
@property({ type: Object }) workflow: ApprovalWorkflow | null = null;

// When workflow changes, component automatically re-renders
this.workflow = newWorkflow; // Triggers re-render
```

**Benefits**:
- Automatic re-rendering
- Type-safe properties
- Efficient updates (only changed properties)

### 4. Service Layer Pattern

**API Abstraction**:
```typescript
// Service layer abstracts API calls
class MockServiceNowAPI {
  async getFlowDefinition(id: string): Promise<ApprovalWorkflow> {
    // Mock implementation
  }
}

// Components use service, not direct API calls
const workflow = await mockAPI.getFlowDefinition('flow-123');
```

**Benefits**:
- Easy to swap implementations (mock → real)
- Centralized API logic
- Easier testing
- Better error handling

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (with HMR)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

- **Port**: 1000
- **URL**: http://localhost:1000
- **Features**: Hot Module Replacement (HMR), Fast Refresh

### Build Process

1. **TypeScript Compilation**: `tsc` compiles TypeScript to JavaScript
2. **Vite Bundling**: Vite bundles and optimizes code
3. **Output**: `dist/` directory with optimized production build

### Testing

```bash
# Run tests
npm test

# Watch mode
npm test:watch
```

## Technology Choices Explained

### Why Lit Over React?

1. **Bundle Size**: 91% smaller (15kb vs 172kb)
2. **ServiceNow Alignment**: Matches strategic direction
3. **Framework Agnostic**: Works everywhere
4. **Performance**: Better for large flows
5. **Standards**: Built on Web Components (W3C)

See `docs/why-lit-beats-react.md` for detailed comparison.

### Why TypeScript?

1. **Type Safety**: Catch errors at compile time
2. **Developer Experience**: Better IDE support
3. **Maintainability**: Self-documenting code
4. **Enterprise**: Industry standard for large projects

### Why Vite Over Webpack?

1. **Speed**: Faster builds and HMR
2. **Simplicity**: Less configuration
3. **Modern**: Native ES modules
4. **Performance**: Optimized for modern browsers

### Why Event-Driven Over Redux?

1. **Simplicity**: Less boilerplate
2. **Native**: Uses browser APIs
3. **Security**: Scoped to component tree
4. **Performance**: Browser-optimized

## Integration Points

### ServiceNow Platform

**APIs Used**:
- Flow API (create, read, update, delete flows)
- User API (get users, approvers)
- Validation API (validate workflows)

**Integration Pattern**:
```typescript
// Service layer abstracts ServiceNow APIs
class ServiceNowAPI {
  async saveFlow(flow: ApprovalWorkflow): Promise<void> {
    // Real ServiceNow API call
    await fetch('/api/now/table/sys_flow', {
      method: 'POST',
      body: JSON.stringify(flow)
    });
  }
}
```

### Browser APIs Used

1. **CustomEvent**: Component communication
2. **CustomElements**: Web Components registration
3. **Shadow DOM**: Component encapsulation
4. **ResizeObserver**: Canvas resizing
5. **LocalStorage**: Offline persistence (future)

## Performance Considerations

### Bundle Size Optimization

- **Lit**: 15kb (vs React 172kb)
- **Tree Shaking**: Vite removes unused code
- **Code Splitting**: Future optimization

### Rendering Performance

- **Reactive Updates**: Only changed components re-render
- **Virtual Scrolling**: For large flows (future)
- **Lazy Loading**: Load components on demand (future)

### Memory Management

- **Event Listener Cleanup**: Remove listeners in `disconnectedCallback`
- **Weak References**: For large data structures (future)
- **Garbage Collection**: Proper cleanup prevents leaks

## Security Architecture

### Component Isolation

- **Shadow DOM**: Encapsulated styling and DOM
- **Scoped Events**: Events bubble through component tree
- **No Global State**: Avoid global singletons in production

### Data Validation

- **TypeScript**: Compile-time type checking
- **Runtime Validation**: Validate API responses
- **Input Sanitization**: Sanitize user input

### Event Security

**Current (POC)**: Global EventBus (security risk)
**Production**: Native CustomEvent (scoped, secure)

See `docs/event-bus-security.md` for details.

## Future Architecture Enhancements

### Planned Features

1. **Real-time Collaboration**: WebSocket integration
2. **Offline Support**: Service Workers + IndexedDB
3. **Plugin System**: Extensible node types
4. **Advanced Debugging**: Breakpoints, step-through
5. **Performance Monitoring**: Metrics and profiling

### Migration Path

**POC → Production**:
1. Replace global EventBus with native CustomEvent
2. Replace mock APIs with real ServiceNow APIs
3. Add error handling and validation
4. Add comprehensive testing
5. Add performance optimizations

## Summary

### Tech Stack Summary

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Lit Element | 3.0.0 | Web Components |
| **Language** | TypeScript | 5.2.2 | Type safety |
| **Build Tool** | Vite | 4.4.9 | Build & dev server |
| **Testing** | Jest | 29.7.0 | Unit tests |
| **Linting** | ESLint | 8.49.0 | Code quality |
| **State** | CustomEvent | Native | Component communication |

### Architecture Summary

- **Pattern**: Event-driven, component-based
- **Communication**: Native browser events
- **State**: Component-level + event propagation
- **Integration**: Service layer abstraction
- **Security**: Scoped events, component isolation

### Key Principles

1. **Web Standards First**: Use native browser APIs
2. **Minimal Dependencies**: Small bundle size
3. **Type Safety**: TypeScript everywhere
4. **Component Isolation**: Shadow DOM, scoped events
5. **ServiceNow Alignment**: Matches strategic direction

This architecture provides a modern, scalable, and maintainable foundation for Flow Designer that addresses customer pain points while aligning with ServiceNow's strategic direction.
