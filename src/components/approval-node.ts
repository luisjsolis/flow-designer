import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ApprovalNode, Position } from '../types';
import { eventBus, EVENTS } from '../utils/event-bus';

@customElement('approval-node')
export class ApprovalNode extends LitElement {
  @property({ type: Object }) node: ApprovalNode;
  @property({ type: Boolean }) isSelected = false;
  @state() private cachedStepNumber: string = '?';
  @state() private lastPositionX: number = 0;

  static styles = css`
    :host {
      position: relative;
      z-index: 10;
    }

    .node {
      position: relative;
      width: 160px;
      min-height: 80px;
      background: #ffffff;
      border: 2px solid #d1d5db;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.2s;
      user-select: text;
      z-index: 1;
    }

    .node:hover {
      border-color: #9ca3af;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .node.selected {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }


    .node.start {
      border-color: #10b981;
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    }

    .node.end {
      border-color: #ef4444;
      background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
    }

    .node.approver {
      border-color: #3b82f6;
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    }

    .node.condition {
      border-color: #f59e0b;
      background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
    }

    .node.parallel {
      border-color: #8b5cf6;
      background: linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%);
    }

    .node-header {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .node-icon {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }

    .node-title {
      flex: 1;
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
    }

    .node-actions {
      display: flex;
      gap: 0.25rem;
      justify-content: center;
      padding: 0.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .node-actions button {
      width: 24px;
      height: 24px;
      border: none;
      border-radius: 0.25rem;
      background: #f3f4f6;
      color: #6b7280;
      cursor: pointer;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .node-actions button:hover {
      background: #e5e7eb;
      color: #374151;
    }

    .node-actions button.delete:hover {
      background: #fef2f2;
      color: #dc2626;
    }

    .node-content {
      padding: 0.75rem;
    }

    .node-info {
      font-size: 0.75rem;
      color: #6b7280;
      line-height: 1.4;
    }

    .approver-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .approver-name {
      font-weight: 500;
      color: #374151;
    }

    .approval-type {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .condition-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .condition-text {
      font-weight: 500;
      color: #374151;
    }

    .parallel-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .parallel-count {
      font-weight: 500;
      color: #374151;
    }

    /* Connection points removed - no longer needed for static layout */

    .step-number {
      position: absolute;
      top: -10px;
      left: -10px;
      width: 24px;
      height: 24px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .node.start .step-number {
      background: #10b981;
    }

    .node.end .step-number {
      background: #6b7280;
    }
  `;

      connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this.onNodeClick);
        this.addEventListener('dblclick', this.onDoubleClick);
        this.setupEventListeners();
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this.onNodeClick);
        this.removeEventListener('dblclick', this.onDoubleClick);
        this.removeEventListeners();
      }

      private setupEventListeners(): void {
        // Listen for property changes from the properties panel
        this.addEventListener('property-changed', this.onPropertyChanged);
        // Also listen via event bus for broader communication
        eventBus.on('property-changed', this.onPropertyChangedEventBus);
      }

      private removeEventListeners(): void {
        this.removeEventListener('property-changed', this.onPropertyChanged);
        eventBus.off('property-changed', this.onPropertyChangedEventBus);
      }

      private onPropertyChanged = (event: CustomEvent): void => {
        const { nodeId, path, value } = event.detail;
        if (nodeId === this.node?.id) {
          this.updateNodeProperty(path, value);
        }
      }

      private onPropertyChangedEventBus = (data: { nodeId: string; path: string; value: any }): void => {
        if (data.nodeId === this.node?.id) {
          this.updateNodeProperty(data.path, data.value);
        }
      }

      private updateNodeProperty(path: string, value: any): void {
        if (!this.node) return;

        const keys = path.split('.');
        let current: any = this.node;
        
        // Navigate to the parent object
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }
        
        // Set the new value
        current[keys[keys.length - 1]] = value;
        this.node.updatedAt = new Date();
        
        // Force a re-render to reflect the changes
        this.requestUpdate();
        
        console.log(`🔄 Node ${this.node.name} updated: ${path} = ${value}`);
      }

  private onNodeClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    // Emit selection event
    if (this.node) {
      this.dispatchEvent(new CustomEvent('node-select', {
        detail: { node: this.node },
        bubbles: true
      }));
    }
  }

  private onDoubleClick(): void {
    this.dispatchEvent(new CustomEvent('node-edit', {
      detail: { node: this.node },
      bubbles: true
    }));
  }

  private onEdit(): void {
    this.dispatchEvent(new CustomEvent('node-edit', {
      detail: { node: this.node },
      bubbles: true
    }));
  }

  private onDelete(): void {
    if (confirm(`Delete "${this.node.name}"?`)) {
      this.dispatchEvent(new CustomEvent('node-delete', {
        detail: { nodeId: this.node.id },
        bubbles: true
      }));
    }
  }

  private onMoveUp(): void {
    console.log('🔄 Move Up clicked for node:', this.node.name, this.node.id);
    
    // Try both event bus and DOM events
    import('../utils/event-bus.js').then(({ eventBus }) => {
      eventBus.emit('node-move-up', { node: this.node });
    });
    
    this.dispatchEvent(new CustomEvent('node-move-up', {
      detail: { node: this.node },
      bubbles: true,
      composed: true
    }));
  }

  private onMoveDown(): void {
    console.log('🔄 Move Down clicked for node:', this.node.name, this.node.id);
    
    // Try both event bus and DOM events
    import('../utils/event-bus.js').then(({ eventBus }) => {
      eventBus.emit('node-move-down', { node: this.node });
    });
    
    this.dispatchEvent(new CustomEvent('node-move-down', {
      detail: { node: this.node },
      bubbles: true,
      composed: true
    }));
  }

  private getNodeIcon(): string {
    const icons = {
      'start': '🚀',
      'end': '🏁',
      'approver': '👤',
      'condition': '❓',
      'parallel': '⚡'
    };
    return icons[this.node.type] || '📋';
  }

  private getStepNumber(): string {
    // Only recalculate if position has changed significantly
    const currentX = this.node.position.x;
    if (Math.abs(currentX - this.lastPositionX) < 5 && this.cachedStepNumber !== '?') {
      return this.cachedStepNumber;
    }
    
    return this.calculateStepNumber();
  }

  private calculateStepNumber(): string {
    // Get the step number based on node position (left to right)
    const canvas = this.shadowRoot?.host.parentElement;
    if (!canvas) return '?';
    
    // Get all approval-node elements and sort by their actual position
    const allNodes = canvas.querySelectorAll('approval-node');
    const sortedNodes = Array.from(allNodes).sort((a, b) => {
      // Get the actual position from the node's data, not just the style
      const aElement = a as any;
      const bElement = b as any;
      const aPos = aElement.node?.position?.x || parseInt(a.style.left) || 0;
      const bPos = bElement.node?.position?.x || parseInt(b.style.left) || 0;
      return aPos - bPos;
    });
    
    const index = sortedNodes.indexOf(this.shadowRoot?.host);
    const stepNumber = index >= 0 ? (index + 1).toString() : '?';
    
    // Cache the result
    this.cachedStepNumber = stepNumber;
    this.lastPositionX = this.node.position.x;
    
    return stepNumber;
  }

  // Public method to force step number recalculation
  public forceStepNumberUpdate(): void {
    this.cachedStepNumber = '?';
    this.lastPositionX = -999999; // Force recalculation
    this.calculateStepNumber();
  }

  private getApproverDisplayText(): string {
    if (!this.node.configuration.approver) {
      return 'Select Approver';
    }

    if (Array.isArray(this.node.configuration.approver)) {
      if (this.node.configuration.approver.length === 0) {
        return 'Select Approver';
      } else if (this.node.configuration.approver.length === 1) {
        return this.node.configuration.approver[0];
      } else {
        return `${this.node.configuration.approver.length} approvers selected`;
      }
    } else {
      return this.node.configuration.approver;
    }
  }

  private getConditionDisplayText(): string {
    if (!this.node.configuration.conditionType || !this.node.configuration.operator || !this.node.configuration.value) {
      return 'Set Condition';
    }

    const conditionType = this.node.configuration.conditionType;
    const operator = this.node.configuration.operator;
    const value = this.node.configuration.value;

    const operatorText = {
      'greaterThan': '>',
      'lessThan': '<',
      'equals': '='
    }[operator] || operator;

    return `${conditionType} ${operatorText} ${value}`;
  }

  private getParallelDisplayText(): string {
    const count = this.node.configuration.parallelCount || 2;
    const approvalType = this.node.configuration.approvalType || 'all';
    const typeText = approvalType === 'all' ? 'All must approve' : 'Any can approve';
    return `${count} approvers - ${typeText}`;
  }

  private renderNodeContent(): any {
    switch (this.node.type) {
      case 'approver':
        return html`
          <div class="approver-info">
            <div class="approver-name">
              ${this.getApproverDisplayText()}
            </div>
            <div class="approval-type">
              ${this.node.configuration.approvalType || 'single'} approval
              ${this.node.configuration.timeout ? `(${this.node.configuration.timeout}d timeout)` : ''}
            </div>
          </div>
        `;
      
      case 'condition':
        return html`
          <div class="condition-info">
            <div class="condition-text">
              ${this.getConditionDisplayText()}
            </div>
          </div>
        `;
      
      case 'parallel':
        return html`
          <div class="parallel-info">
            <div class="parallel-count">
              ${this.getParallelDisplayText()}
            </div>
          </div>
        `;
      
      case 'start':
        return html`
          <div class="node-info">
            <div class="condition-text">
              ${this.node.configuration.triggerSource || 'Trigger Source'}
            </div>
          </div>
        `;
      
      default:
        return html`
          <div class="node-info">
            ${this.node.name}
          </div>
        `;
    }
  }

  render() {
    if (!this.node) {
      console.warn('ApprovalNode: No node data provided');
      return html``;
    }

    return html`
      <div 
        class="node ${this.node.type} ${this.isSelected ? 'selected' : ''} ${this.isDragging ? 'dragging' : ''}">
        
        <!-- Node Header -->
        <div class="node-header">
          <div class="node-icon">${this.getNodeIcon()}</div>
          <div class="node-title">${this.node.name}</div>
        </div>
        
        <!-- Step Number -->
        <div class="step-number">${this.getStepNumber()}</div>

        <!-- Node Content -->
        <div class="node-content">
          ${this.renderNodeContent()}
        </div>

        <!-- Node Actions (centered overlay) -->
        <div class="node-actions">
          <button @click=${this.onMoveUp} title="Move Up">⬆️</button>
          <button @click=${this.onMoveDown} title="Move Down">⬇️</button>
          <button @click=${this.onEdit} title="Edit">✏️</button>
          <button @click=${this.onDelete} class="delete" title="Delete">🗑️</button>
        </div>

            <!-- Connection points removed for static layout -->
      </div>
    `;
  }
}
