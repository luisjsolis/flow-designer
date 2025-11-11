# Flow Designer V2 - Technical Architecture

## Executive Summary

 The architecture addresses key customer pain points through a complete rearchitecture using Web Components, TypeScript, and modern development practices.

## Problem Statement

### Current Flow Designer Limitations

## Solution Architecture

### Technology Stack Decision

**Web Components + TypeScript over React**

**Rationale:**
1. **ServiceNow Alignment**: ServiceNow is moving away from React to Web Components
2. **Performance**: 91% smaller bundle size (15kb vs 172kb)
3. **Framework Agnostic**: Components work with any framework
4. **Future-Proof**: Built on web standards, not proprietary frameworks

### System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              PRESENTATION LAYER                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                │
│  │   flow-designer │  │   node-palette  │  │  property-panel │                │
│  │   (main app)    │  │   (toolbox)     │  │  (config)       │                │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                │
│           │                     │                     │                        │
│           └─────────────────────┼─────────────────────┘                        │
│                                 │                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                        flow-canvas                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │ flow-node   │  │ flow-node   │  │ flow-node   │  │ flow-node   │   │   │
│  │  │ (trigger)   │  │ (action)    │  │ (condition) │  │ (loop)      │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  │                                                                         │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │   │
│  │  │              connection-layer (SVG)                            │   │   │
│  │  │         (draws lines between nodes)                            │   │   │
│  │  └─────────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              STATE MANAGEMENT                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                │
│  │  FlowState      │  │  EventBus       │  │  UndoManager    │                │
│  │  (immutable)    │  │  (pub/sub)      │  │  (history)      │                │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                │
│           │                     │                     │                        │
│           └─────────────────────┼─────────────────────┘                        │
│                                 │                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    FlowPersistence                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │ LocalStore  │  │ AutoSave    │  │ ConflictRes │  │ Versioning  │   │   │
│  │  │ (offline)   │  │ (debounced) │  │ (merge)     │  │ (history)   │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              EXECUTION ENGINE                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                │
│  │ FlowValidator   │  │ FlowSimulator   │  │ FlowExecutor    │                │
│  │ (syntax check)  │  │ (dry run)       │  │ (actual run)    │                │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                │
│           │                     │                     │                        │
│           └─────────────────────┼─────────────────────┘                        │
│                                 │                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    NodeExecutors                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │ TriggerExec │  │ ActionExec  │  │ LogicExec   │  │ CustomExec  │   │   │
│  │  │ (webhook)   │  │ (API call)  │  │ (if/loop)   │  │ (plugins)   │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              INTEGRATION LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                │
│  │ ServiceNowAPI   │  │ WebSocketMgr    │  │ PluginManager   │                │
│  │ (REST/GraphQL)  │  │ (real-time)     │  │ (extensions)    │                │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                │
│           │                     │                     │                        │
│           └─────────────────────┼─────────────────────┘                        │
│                                 │                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    DataLayer                                           │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │ FlowStore   │  │ UserStore   │  │ ConfigStore │  │ AuditStore  │   │   │
│  │  │ (flows)     │  │ (prefs)     │  │ (settings)  │  │ (history)   │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              SERVICENOW PLATFORM                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                │
│  │ Flow Engine     │  │ Data Tables     │  │ Integration Hub │                │
│  │ (execution)     │  │ (persistence)   │  │ (external APIs) │                │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                │
│           │                     │                     │                        │
│           └─────────────────────┼─────────────────────┘                        │
│                                 │                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    Now Experience UI Framework                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │ Web Comp    │  │ Design Sys  │  │ Theme Mgr   │  │ Router      │   │   │
│  │  │ (base)      │  │ (styles)    │  │ (branding)  │  │ (nav)       │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Key Architectural Decisions

### 1. Web Components Architecture

**Decision**: Use Web Components with Lit Element instead of React

**Rationale**:
- Aligns with ServiceNow's strategic direction
- 91% smaller bundle size
- Framework agnostic
- Better performance for large flows

**Implementation**:
```typescript
@customElement('flow-canvas')
export class FlowCanvas extends LitElement {
  @property({ type: Array }) nodes: FlowNode[] = [];
  @property({ type: Object }) selectedNode: FlowNode | null = null;
  
  render() {
    return html`
      <div class="canvas-container">
        ${this.nodes.map(node => html`
          <flow-node .nodeData=${node}></flow-node>
        `)}
      </div>
    `;
  }
}
```

### 2. Event-Driven State Management

**Decision**: Custom event system with direct state mutation

**Rationale**:
- Enables real-time collaboration
- Decouples components (no props drilling)
- Predictable state updates
- Better debugging capabilities
- Simpler than React's immutable patterns

**Implementation**:
```typescript
// Simple Event Bus - No Redux/Context needed!
export class EventBus {
  private listeners: Map<string, Function[]> = new Map();
  
  emit(event: string, data?: any): void {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event callback for ${event}:`, error);
      }
    });
  }
  
  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }
  
  off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event) || [];
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }
}

// Global event bus instance
export const eventBus = new EventBus();

// Event types for type safety
export const EVENTS = {
  WORKFLOW_UPDATED: 'workflow-updated',
  NODE_SELECTED: 'node-selected',
  NODE_ADDED: 'node-added',
  NODE_EDITED: 'node-edited',
  NODE_DELETED: 'node-deleted',
  PROPERTY_CHANGED: 'property-changed',
  VALIDATION_ERROR: 'validation-error'
} as const;
```

**State Flow Example - Adding a Node**:
```typescript
// 1. User clicks node type in palette
@customElement('approval-palette')
export class ApprovalPalette extends LitElement {
  private onNodeTypeClick(type: string): void {
    eventBus.emit('node-type-add', { nodeType: type });
  }
}

// 2. Builder listens and creates node
@customElement('approval-builder')
export class ApprovalBuilder extends LitElement {
  private onNodeTypeAdd(data: { nodeType: string }): void {
    this.addNode(data.nodeType);
  }
  
  private addNode(type: string): void {
    const node = {
      id: `node_${Date.now()}`,
      type: type,
      name: this.getDefaultNodeName(type),
      position: { x: 0, y: 0 },
      configuration: this.getDefaultConfiguration(type),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.workflow!.nodes.push(node);
    // 3. Notify all components
    eventBus.emit(EVENTS.WORKFLOW_UPDATED, this.workflow);
    this.requestUpdate();
  }
}

// 4. Canvas automatically updates
@customElement('approval-canvas')
export class ApprovalCanvas extends LitElement {
  private onWorkflowUpdated(workflow: ApprovalWorkflow): void {
    this.workflow = workflow;
    this.requestUpdate();
  }
}
```

**Property Change Example**:
```typescript
// Direct mutation - much simpler than React's immutable updates!
private updateNodeProperty(path: string, value: any): void {
  if (!this.selectedNode) return;

  const keys = path.split('.');
  let current: any = this.selectedNode;
  
  // Navigate to the parent object
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  
  // Set the new value
  current[keys[keys.length - 1]] = value;
  this.selectedNode.updatedAt = new Date();
  
  // Emit event for other components
  this.dispatchEvent(new CustomEvent('property-changed', {
    detail: { nodeId: this.selectedNode.id, path, value },
    bubbles: true
  }));
  
  this.requestUpdate();
}
```

### 3. Offline-First Architecture

**Decision**: Local storage with server synchronization

**Rationale**:
- Better user experience
- Handles network issues gracefully
- Enables conflict resolution
- Auto-save capabilities

**Implementation**:
```typescript
class FlowPersistence {
  async saveFlow(flow: FlowDefinition): Promise<void> {
    // Auto-save with versioning
    const versionedFlow = {
      ...flow,
      version: this.incrementVersion(flow.version),
      updatedAt: new Date()
    };
    
    // Save to local storage
    this.storage.setItem(`flow_${flow.id}`, JSON.stringify(versionedFlow));
    
    // Sync to server
    await this.syncToServer(versionedFlow);
  }
}
```

### 4. Real-time Collaboration

**Decision**: WebSocket-based multi-user editing

**Rationale**:
- Competitive differentiator
- Improves team productivity
- Reduces conflicts
- Better user experience

**Implementation**:
```typescript
class FlowWebSocket {
  sendNodeUpdate(nodeId: string, updates: Partial<FlowNode>) {
    this.ws.send(JSON.stringify({
      type: 'node-update',
      nodeId,
      updates,
      timestamp: Date.now()
    }));
  }
}
```

## Advanced Flow Debugger

### Features

1. **Real-time Execution Monitoring**
   - Visual execution timeline
   - Step-by-step progress tracking
   - Success/failure indicators

2. **Breakpoints and Step-through**
   - Set breakpoints on any node
   - Step through execution
   - Inspect variables at any point

3. **Variable Inspection**
   - Real-time variable values
   - Data flow visualization
   - Type information display

4. **Performance Profiling**
   - Execution time per node
   - Memory usage tracking
   - Bottleneck identification

5. **Collaborative Debugging**
   - Multiple users can debug together
   - Shared breakpoints
   - Real-time debugging session

### Implementation

```typescript
@customElement('flow-debugger')
export class FlowDebugger extends LitElement {
  @property({ type: Object }) executionState: ExecutionState;
  @property({ type: Array }) breakpoints: Breakpoint[] = [];
  
  render() {
    return html`
      <div class="debugger-panel">
        <execution-timeline .steps=${this.executionState.steps}></execution-timeline>
        <variable-inspector .variables=${this.executionState.variables}></variable-inspector>
        <breakpoint-manager .breakpoints=${this.breakpoints}></breakpoint-manager>
      </div>
    `;
  }
}
```

## Performance Optimizations

### 1. Virtual Scrolling
- Handle large flows efficiently
- Only render visible nodes
- Smooth scrolling performance

### 2. Web Workers
- Offload heavy computations
- Flow validation in background
- Non-blocking UI updates

### 3. Lazy Loading
- Load components on demand
- Reduce initial bundle size
- Faster application startup

### 4. Service Workers
- Offline capabilities
- Background synchronization
- Push notifications

## Security Considerations

### 1. Data Protection
- Input validation and sanitization
- XSS prevention
- CSRF protection
- Secure API communication

### 2. Access Control
- Role-based permissions
- Flow-level security
- Audit logging
- Session management

### 3. Compliance
- GDPR compliance
- SOC 2 requirements
- Data encryption
- Privacy controls

## Testing Strategy

### 1. Unit Testing
- Component testing with Jest
- Web Test Runner for Web Components
- Mock ServiceNow APIs

### 2. Integration Testing
- API integration tests
- End-to-end testing with Playwright
- Real-time collaboration testing

### 3. Performance Testing
- Load testing with large flows
- Memory leak detection
- Bundle size monitoring

## Deployment Strategy

### 1. Development Environment
- Local development with Vite
- ServiceNow CLI integration
- Hot module replacement

### 2. Staging Environment
- Automated testing
- Performance monitoring
- User acceptance testing

### 3. Production Deployment
- Feature flags for gradual rollout
- A/B testing capabilities
- Rollback procedures

## Migration Plan

### Phase 1: Proof of Concept (4 weeks)
- Core Web Components architecture
- Basic flow canvas with drag-and-drop
- Simple debugging interface
- ServiceNow API integration

### Phase 2: Advanced Features (8 weeks)
- Real-time collaboration
- Advanced debugging tools
- Performance optimizations
- Plugin architecture

### Phase 3: Production Migration (12 weeks)
- Parallel development with existing system
- Feature flags for gradual rollout
- User training and documentation
- Performance monitoring

## Risk Mitigation

### Technical Risks
1. **API Compatibility Changes**
   - Mitigation: Build abstraction layer, maintain API versioning

2. **Performance with Large Flows**
   - Mitigation: Virtual scrolling, lazy loading, Web Workers

3. **Browser Compatibility**
   - Mitigation: Progressive enhancement, polyfills

### Business Risks
1. **User Adoption Resistance**
   - Mitigation: Gradual rollout, extensive training, feature parity

2. **Timeline Delays**
   - Mitigation: Agile development, regular demos, scope flexibility

## Success Metrics

### Performance Metrics
- Bundle size reduction: 91% smaller than React
- Load time improvement: 50% faster initial load
- Memory usage: 30% reduction in memory footprint

### User Experience Metrics
- Debugging time reduction: 70% faster issue resolution
- Collaboration efficiency: 40% improvement in team productivity
- User satisfaction: 90% positive feedback

### Business Metrics
- Customer retention: 15% improvement
- Support ticket reduction: 25% fewer debugging issues
- Feature adoption: 80% of users adopt new debugging features

## Conclusion

This architecture provides a modern, scalable, and maintainable foundation for Flow Designer that addresses key customer pain points while aligning with ServiceNow's strategic direction. The focus on Web Components, real-time collaboration, and advanced debugging capabilities positions ServiceNow as the leader in enterprise workflow automation.
