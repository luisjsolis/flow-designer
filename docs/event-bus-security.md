# Event Bus: Security & Architecture Considerations

## Is Event Bus Native Browser?

**No, the EventBus is a custom implementation**, not a native browser API. However, browsers DO provide native event systems that we could use instead.

### Current Implementation (Custom EventBus)

```typescript
// Custom implementation - NOT native browser
export class EventBus {
  private listeners: Map<string, Function[]> = new Map();
  
  emit(event: string, data?: any): void {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }
  
  on(event: string, callback: Function): void {
    // Custom pub/sub implementation
  }
}

// Global singleton instance
export const eventBus = new EventBus();
```

### Native Browser Alternatives

Browsers provide native event systems:

1. **CustomEvent API** (Native)
```typescript
// Native browser CustomEvent
const event = new CustomEvent('node-selected', {
  detail: { nodeId: '123' },
  bubbles: true
});
element.dispatchEvent(event);
```

2. **EventTarget API** (Native)
```typescript
// Native EventTarget for custom event handling
class CustomEventTarget extends EventTarget {
  emit(eventName: string, data: any) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  }
}
```

## Why Is It Global?

The EventBus is global (singleton pattern) for **convenience**, but this has trade-offs:

### Benefits of Global Singleton
- ✅ **Easy to use** - no need to pass instances around
- ✅ **Simple API** - just `eventBus.emit()` and `eventBus.on()`
- ✅ **Works across components** - no props drilling needed
- ✅ **Familiar pattern** - similar to Redux store or Context API

### Drawbacks of Global Singleton
- ⚠️ **Security risk** - any code can listen/emit events
- ⚠️ **No isolation** - all components share same bus
- ⚠️ **Harder to test** - global state is harder to mock
- ⚠️ **Memory leaks** - listeners must be manually cleaned up

## Security Concerns

### 1. **Event Injection Attacks**

**Problem**: Malicious code can inject events:

```typescript
// Malicious code could do this:
eventBus.emit('workflow-updated', {
  nodes: maliciousNodes,
  // Could inject malicious data
});

// Or listen to sensitive events:
eventBus.on('workflow-saved', (data) => {
  // Steal workflow data
  sendToAttacker(data);
});
```

**Risk Level**: **HIGH** in multi-tenant environments or if third-party code runs in the same context.

### 2. **Event Spoofing**

**Problem**: Any code can emit events that look legitimate:

```typescript
// Attacker could spoof events:
eventBus.emit('node-selected', {
  nodeId: 'admin-node',
  // Gain access to admin features
});
```

### 3. **Data Leakage**

**Problem**: Global event bus means all listeners can see all events:

```typescript
// Component A emits sensitive data
eventBus.emit('user-data', { ssn: '123-45-6789' });

// Component B (shouldn't have access) can listen:
eventBus.on('user-data', (data) => {
  console.log('Stolen SSN:', data.ssn);
});
```

## Security Solutions

### Option 1: Use Native Browser Events (Recommended)

**Benefits**:
- ✅ **Scoped to DOM tree** - events bubble through component hierarchy
- ✅ **Better security** - can't be accessed from outside component tree
- ✅ **Native browser API** - no custom code to maintain
- ✅ **Better performance** - browser-optimized

**Implementation**:

```typescript
// Instead of global eventBus, use native CustomEvent
@customElement('approval-properties')
export class ApprovalProperties extends LitElement {
  private updateNodeProperty(path: string, value: any): void {
    // Update state
    this.selectedNode.configuration.approver = value;
    
    // Emit native browser event (scoped to component tree)
    this.dispatchEvent(new CustomEvent('property-changed', {
      detail: { nodeId: this.selectedNode.id, path, value },
      bubbles: true, // Allows parent components to listen
      composed: true // Allows crossing shadow DOM boundaries
    }));
    
    this.requestUpdate();
  }
}

// Parent component listens via native addEventListener
@customElement('approval-canvas')
export class ApprovalCanvas extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    // Native event listener - scoped to this component
    this.addEventListener('property-changed', this.onPropertyChanged);
  }
  
  private onPropertyChanged = (event: CustomEvent): void => {
    const { nodeId, path, value } = event.detail;
    this.updateWorkflowNodeProperty(nodeId, path, value);
  }
}
```

### Option 2: Scoped Event Bus (Better Security)

**Create event buses scoped to specific contexts**:

```typescript
// Scoped EventBus - not global
export class ScopedEventBus {
  private listeners: Map<string, Function[]> = new Map();
  private scope: string; // Security: scope identifier
  
  constructor(scope: string) {
    this.scope = scope;
  }
  
  emit(event: string, data?: any): void {
    // Validate event is allowed in this scope
    if (!this.isEventAllowed(event)) {
      console.warn(`Event ${event} not allowed in scope ${this.scope}`);
      return;
    }
    
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event callback:`, error);
      }
    });
  }
  
  private isEventAllowed(event: string): boolean {
    // Define allowed events per scope
    const allowedEvents = {
      'workflow': ['workflow-updated', 'workflow-saved'],
      'node': ['node-selected', 'node-added', 'node-deleted'],
      'ui': ['canvas-clicked', 'property-changed']
    };
    
    return allowedEvents[this.scope]?.includes(event) ?? false;
  }
}

// Create scoped instances instead of global
export const workflowEventBus = new ScopedEventBus('workflow');
export const nodeEventBus = new ScopedEventBus('node');
export const uiEventBus = new ScopedEventBus('ui');
```

### Option 3: Event Bus with Security Layer

**Add validation and access control**:

```typescript
export class SecureEventBus {
  private listeners: Map<string, Function[]> = new Map();
  private allowedEvents: Set<string>;
  private allowedEmitters: WeakSet<object>; // Track who can emit
  
  constructor(allowedEvents: string[]) {
    this.allowedEvents = new Set(allowedEvents);
  }
  
  // Register component as allowed emitter
  registerEmitter(component: object): void {
    this.allowedEmitters.add(component);
  }
  
  emit(event: string, data?: any, emitter?: object): void {
    // Security check: validate event is allowed
    if (!this.allowedEvents.has(event)) {
      console.warn(`Event ${event} is not in allowed list`);
      return;
    }
    
    // Security check: validate emitter is registered
    if (emitter && !this.allowedEmitters.has(emitter)) {
      console.warn(`Unauthorized emitter for event ${event}`);
      return;
    }
    
    // Sanitize data before emitting
    const sanitizedData = this.sanitizeData(data);
    
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => {
      try {
        callback(sanitizedData);
      } catch (error) {
        console.error(`Error in event callback:`, error);
      }
    });
  }
  
  private sanitizeData(data: any): any {
    // Remove potentially dangerous data
    if (typeof data === 'object' && data !== null) {
      const sanitized = { ...data };
      // Remove functions (could be malicious)
      Object.keys(sanitized).forEach(key => {
        if (typeof sanitized[key] === 'function') {
          delete sanitized[key];
        }
      });
      return sanitized;
    }
    return data;
  }
}

// Usage with security
const secureEventBus = new SecureEventBus([
  'workflow-updated',
  'node-selected',
  'property-changed'
]);

@customElement('approval-builder')
export class ApprovalBuilder extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    // Register as allowed emitter
    secureEventBus.registerEmitter(this);
  }
  
  private addNode(type: string): void {
    // Emit with security validation
    secureEventBus.emit('node-added', { type }, this);
  }
}
```

## Recommended Approach for Production

### For ServiceNow Flow Designer:

**Use Native Browser Events** (Option 1) because:

1. ✅ **Better Security**: Events are scoped to component tree
2. ✅ **Native API**: No custom code to maintain
3. ✅ **Better Performance**: Browser-optimized
4. ✅ **Web Components Standard**: Aligns with Web Components best practices
5. ✅ **Type Safety**: Can use TypeScript with CustomEvent

**Implementation Pattern**:

```typescript
// Define typed events
interface NodeSelectedEvent extends CustomEvent {
  detail: {
    nodeId: string;
    node: ApprovalNode;
  };
}

@customElement('approval-node')
export class ApprovalNode extends LitElement {
  private onNodeClick(): void {
    // Emit typed native event
    this.dispatchEvent(new CustomEvent('node-selected', {
      detail: {
        nodeId: this.node.id,
        node: this.node
      },
      bubbles: true,
      composed: true
    }) as NodeSelectedEvent);
  }
}

@customElement('approval-canvas')
export class ApprovalCanvas extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    // Listen to native events from child components
    this.addEventListener('node-selected', this.onNodeSelected);
  }
  
  private onNodeSelected = (event: CustomEvent): void => {
    const { nodeId, node } = (event as NodeSelectedEvent).detail;
    this.selectedNodeId = nodeId;
    // Update workflow state
  }
}
```

## Migration Path

### Current (Global EventBus):
```typescript
// Global - security risk
eventBus.emit('workflow-updated', workflow);
eventBus.on('workflow-updated', callback);
```

### Recommended (Native Events):
```typescript
// Scoped - more secure
this.dispatchEvent(new CustomEvent('workflow-updated', {
  detail: workflow,
  bubbles: true
}));

this.addEventListener('workflow-updated', callback);
```

## Summary

| Aspect | Global EventBus | Native Browser Events |
|--------|----------------|---------------------|
| **Security** | ⚠️ Low - accessible to all code | ✅ High - scoped to component tree |
| **Performance** | ✅ Good | ✅ Excellent (browser-optimized) |
| **Maintainability** | ⚠️ Custom code | ✅ Native API |
| **Isolation** | ❌ No isolation | ✅ Component-scoped |
| **Type Safety** | ✅ Can be typed | ✅ Can be typed |
| **Testing** | ⚠️ Harder (global state) | ✅ Easier (scoped) |

## Conclusion

**For Production**: Use **Native Browser Events (CustomEvent)** instead of a global EventBus for better security, performance, and maintainability.

**For POC/Demo**: The global EventBus is fine for simplicity, but should be migrated to native events before production deployment.

The current implementation is **acceptable for a proof of concept**, but **native browser events are recommended for production** to address security concerns.
