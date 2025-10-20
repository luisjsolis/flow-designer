// Simple Event Bus for Component Communication
// No Redux/Context needed - just events!

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
  
  once(event: string, callback: Function): void {
    const onceCallback = (data: any) => {
      callback(data);
      this.off(event, onceCallback);
    };
    this.on(event, onceCallback);
  }
}

// Global event bus instance
export const eventBus = new EventBus();

// Event types for type safety
export const EVENTS = {
  // Workflow events
  WORKFLOW_UPDATED: 'workflow-updated',
  WORKFLOW_SAVED: 'workflow-saved',
  WORKFLOW_VALIDATED: 'workflow-validated',
  
  // Node events
  NODE_SELECTED: 'node-selected',
  NODE_ADDED: 'node-added',
  NODE_EDITED: 'node-edited',
  NODE_DELETED: 'node-deleted',
  NODE_MOVED: 'node-moved',
  
  // Connection events
  CONNECTION_ADDED: 'connection-added',
  CONNECTION_DELETED: 'connection-deleted',
  
  // UI events
  CANVAS_CLICKED: 'canvas-clicked',
  PROPERTY_CHANGED: 'property-changed',
  
  // Validation events
  VALIDATION_ERROR: 'validation-error',
  VALIDATION_SUCCESS: 'validation-success'
} as const;
