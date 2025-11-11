# Why Lit Doesn't Include an Event Bus

## TL;DR

**Lit doesn't include an event bus because:**
1. ✅ **Native browser events are the standard** - Lit promotes web standards
2. ✅ **Event bus is state management** - not Lit's concern (focused on rendering)
3. ✅ **Native events are better** - more secure, performant, standard
4. ✅ **Stay lightweight** - Lit is minimal by design

**You don't need a custom event bus** - use native `CustomEvent` API instead!

## Lit's Design Philosophy

### 1. **Web Standards First**

Lit's core principle: **Use native browser APIs whenever possible**

```typescript
// Lit encourages this (native browser API):
this.dispatchEvent(new CustomEvent('node-selected', {
  detail: { nodeId: '123' },
  bubbles: true
}));

// Not this (custom abstraction):
eventBus.emit('node-selected', { nodeId: '123' });
```

**Why?**
- ✅ Native APIs are browser-optimized
- ✅ Native APIs are standard (W3C)
- ✅ Native APIs work everywhere
- ✅ Native APIs are more secure (scoped to DOM tree)

### 2. **Minimal and Focused**

**Lit's scope:**
- ✅ Component rendering
- ✅ Reactive properties
- ✅ Lifecycle management
- ✅ Template rendering

**Lit's scope (NOT):**
- ❌ State management (use native events or libraries)
- ❌ Routing (use native or libraries)
- ❌ HTTP requests (use Fetch API or libraries)
- ❌ Event buses (use native CustomEvent)

**Lit stays small** (15kb) by not including everything.

### 3. **Avoid Unnecessary Abstractions**

**Lit's philosophy: Don't abstract what browsers already do well**

```typescript
// ❌ Custom abstraction (unnecessary)
class EventBus {
  emit(event: string, data: any) { /* ... */ }
  on(event: string, callback: Function) { /* ... */ }
}

// ✅ Native browser API (what Lit promotes)
element.dispatchEvent(new CustomEvent('event-name', { detail: data }));
element.addEventListener('event-name', callback);
```

**Native events already work perfectly** - why add another layer?

## Why Native Events Are Better

### 1. **Security: Scoped to DOM Tree**

**Native CustomEvent:**
```typescript
// Events bubble through component tree (scoped)
@customElement('approval-node')
export class ApprovalNode extends LitElement {
  private onNodeClick(): void {
    // Event is scoped to component tree
    this.dispatchEvent(new CustomEvent('node-selected', {
      detail: { nodeId: this.node.id },
      bubbles: true // Only parent components can listen
    }));
  }
}
```

**Global EventBus:**
```typescript
// Events are global (security risk)
eventBus.emit('node-selected', { nodeId: '123' });
// Any code anywhere can listen to this!
```

**Security Advantage:** Native events are scoped, event bus is global.

### 2. **Performance: Browser-Optimized**

**Native CustomEvent:**
- ✅ Browser-optimized event handling
- ✅ Efficient event bubbling
- ✅ Native event queue management
- ✅ Better memory management

**Custom EventBus:**
- ⚠️ JavaScript implementation
- ⚠️ Manual listener management
- ⚠️ Potential memory leaks
- ⚠️ Not browser-optimized

**Performance Advantage:** Native events are faster.

### 3. **Standard: W3C Specification**

**Native CustomEvent:**
- ✅ W3C standard (browser native)
- ✅ Works in all modern browsers
- ✅ Future-proof (standards don't break)
- ✅ Well-documented

**Custom EventBus:**
- ⚠️ Custom implementation
- ⚠️ Need to maintain yourself
- ⚠️ Not a standard
- ⚠️ Could break with browser updates

**Standards Advantage:** Native events are standard, event bus is custom.

### 4. **Debugging: Better DevTools Support**

**Native CustomEvent:**
```typescript
// Shows up in browser DevTools
this.dispatchEvent(new CustomEvent('node-selected', { detail: data }));

// Can inspect in:
// - Chrome DevTools Event Listeners panel
// - Firefox DevTools Events panel
// - Standard browser debugging tools
```

**Custom EventBus:**
```typescript
// Doesn't show up in DevTools
eventBus.emit('node-selected', data);

// Need custom debugging tools
// Harder to trace event flow
```

**Debugging Advantage:** Native events integrate with browser DevTools.

## How Lit Components Should Communicate

### Pattern 1: Parent-Child Communication (Recommended)

**Use native events that bubble up:**

```typescript
// Child component emits event
@customElement('approval-node')
export class ApprovalNode extends LitElement {
  private onNodeClick(): void {
    // Event bubbles to parent
    this.dispatchEvent(new CustomEvent('node-selected', {
      detail: { nodeId: this.node.id },
      bubbles: true // Bubbles to parent
    }));
  }
}

// Parent component listens
@customElement('approval-canvas')
export class ApprovalCanvas extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    // Listen to events from child components
    this.addEventListener('node-selected', this.onNodeSelected);
  }
  
  private onNodeSelected = (event: CustomEvent): void => {
    const { nodeId } = event.detail;
    this.selectedNodeId = nodeId;
    this.requestUpdate();
  }
}
```

**Benefits:**
- ✅ Scoped to component tree
- ✅ Standard browser API
- ✅ Better security
- ✅ Better performance

### Pattern 2: Sibling Communication

**Use parent as mediator:**

```typescript
// Component A emits to parent
@customElement('approval-palette')
export class ApprovalPalette extends LitElement {
  private onNodeTypeClick(type: string): void {
    this.dispatchEvent(new CustomEvent('node-type-add', {
      detail: { nodeType: type },
      bubbles: true // Bubbles to parent
    }));
  }
}

// Parent receives and forwards
@customElement('approval-builder')
export class ApprovalBuilder extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('node-type-add', this.onNodeTypeAdd);
  }
  
  private onNodeTypeAdd = (event: CustomEvent): void => {
    const { nodeType } = event.detail;
    this.addNode(nodeType);
    
    // Forward to other components via native event
    this.dispatchEvent(new CustomEvent('workflow-updated', {
      detail: { workflow: this.workflow },
      bubbles: true
    }));
  }
}

// Component B listens to parent
@customElement('approval-canvas')
export class ApprovalCanvas extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('workflow-updated', this.onWorkflowUpdated);
  }
  
  private onWorkflowUpdated = (event: CustomEvent): void => {
    this.workflow = event.detail.workflow;
    this.requestUpdate();
  }
}
```

**Benefits:**
- ✅ Clear data flow (parent → children)
- ✅ Scoped communication
- ✅ Standard browser API

### Pattern 3: Global Communication (When Needed)

**Use document-level events (still native!):**

```typescript
// Emit on document (global scope)
document.dispatchEvent(new CustomEvent('workflow-saved', {
  detail: { workflowId: '123' }
}));

// Listen on document (any component)
document.addEventListener('workflow-saved', (event: CustomEvent) => {
  console.log('Workflow saved:', event.detail.workflowId);
});
```

**Benefits:**
- ✅ Still native browser API
- ✅ Global scope when needed
- ✅ Better than custom event bus

## Why You Don't Need a Custom Event Bus

### What Event Bus Provides

1. **Pub/Sub Pattern** - Subscribe to events
2. **Global Communication** - Communicate across components
3. **Event Namespacing** - Organize events
4. **One-time Listeners** - Listen once and remove

### What Native Events Provide

1. **Pub/Sub Pattern** ✅
   ```typescript
   element.addEventListener('event-name', callback); // Subscribe
   element.dispatchEvent(new CustomEvent('event-name')); // Publish
   ```

2. **Global Communication** ✅
   ```typescript
   document.dispatchEvent(new CustomEvent('global-event'));
   document.addEventListener('global-event', callback);
   ```

3. **Event Namespacing** ✅
   ```typescript
   // Use descriptive event names
   'workflow:updated'
   'node:selected'
   'property:changed'
   ```

4. **One-time Listeners** ✅
   ```typescript
   element.addEventListener('event-name', callback, { once: true });
   ```

**Native events provide everything an event bus does!**

## When You Might Need a Custom Event Bus

### Rare Cases

**You might need a custom event bus if:**

1. **Complex Event Filtering**
   ```typescript
   // Need to filter events by type, source, etc.
   eventBus.on('*', (event) => {
     if (event.type === 'workflow' && event.source === 'user') {
       // Handle
     }
   });
   ```

2. **Event Middleware/Transformation**
   ```typescript
   // Need to transform events before delivery
   eventBus.addMiddleware((event) => {
     event.data = sanitize(event.data);
     return event;
   });
   ```

3. **Event History/Replay**
   ```typescript
   // Need to replay events
   eventBus.replay(eventHistory);
   ```

**For most applications, native events are sufficient.**

## Lit's Official Recommendation

### Lit Documentation Says:

> "Use native browser events (CustomEvent) for component communication. Lit components extend HTMLElement, so they have full access to the native event system."

### Lit Examples Show:

```typescript
// Lit's official examples use native events
@customElement('my-element')
class MyElement extends LitElement {
  private handleClick() {
    // Native CustomEvent
    this.dispatchEvent(new CustomEvent('custom-click', {
      detail: { message: 'clicked' },
      bubbles: true
    }));
  }
}
```

**Lit doesn't provide an event bus because it doesn't need to** - native events work perfectly!

## Migration: From Event Bus to Native Events

### Current (Custom EventBus)

```typescript
// Emit
eventBus.emit('workflow-updated', workflow);

// Listen
eventBus.on('workflow-updated', (workflow) => {
  this.workflow = workflow;
});
```

### Recommended (Native Events)

```typescript
// Emit
this.dispatchEvent(new CustomEvent('workflow-updated', {
  detail: { workflow },
  bubbles: true
}));

// Listen
this.addEventListener('workflow-updated', (event: CustomEvent) => {
  this.workflow = event.detail.workflow;
});
```

**Benefits:**
- ✅ More secure (scoped)
- ✅ Better performance (browser-optimized)
- ✅ Standard API (W3C)
- ✅ Better debugging (DevTools support)

## Summary

### Why Lit Doesn't Include Event Bus

1. ✅ **Native events are standard** - Lit promotes web standards
2. ✅ **Native events are better** - more secure, performant, debuggable
3. ✅ **Event bus is unnecessary** - native events provide same functionality
4. ✅ **Stay lightweight** - Lit is minimal by design
5. ✅ **Focus on rendering** - state management is separate concern

### What You Should Do

**Use native browser events instead of custom event bus:**

```typescript
// ✅ Recommended (native browser API)
this.dispatchEvent(new CustomEvent('event-name', {
  detail: { data },
  bubbles: true
}));

// ❌ Not needed (custom abstraction)
eventBus.emit('event-name', data);
```

**Native events provide everything an event bus does, plus:**
- ✅ Better security (scoped to DOM tree)
- ✅ Better performance (browser-optimized)
- ✅ Standard API (W3C)
- ✅ Better debugging (DevTools support)

**You don't need a custom event bus** - the browser already provides one (CustomEvent API)!
