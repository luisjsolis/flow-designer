import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ApprovalWorkflow, ApprovalNode, User } from '../types';
import { mockAPI } from '../services/mock-api';

@customElement('approval-properties')
export class ApprovalProperties extends LitElement {
  @property({ type: String }) selectedNodeId: string | null = null;
  @property({ type: Object }) workflow: ApprovalWorkflow | null = null;
  @state() private users: User[] = [];
  @state() private isLoading = false;

  static styles = css`
    :host {
      display: block;
      height: 100%;
      background: #f8f9fa;
    }

    .properties {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .properties-header {
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
      background: #ffffff;
    }

    .properties-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
    }

    .properties-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .no-selection {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #6b7280;
      text-align: center;
    }

    .no-selection-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .no-selection h4 {
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
    }

    .no-selection p {
      margin: 0;
      font-size: 0.875rem;
    }

    .node-info {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .node-type {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      background: #f3f4f6;
      color: #374151;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .property-group {
      margin-bottom: 1.5rem;
    }

    .property-group:last-child {
      margin-bottom: 0;
    }

    .property-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .property-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: #374151;
      background: #ffffff;
      transition: border-color 0.2s;
    }

    .property-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .property-select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: #374151;
      background: #ffffff;
      cursor: pointer;
    }

    .property-select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .approver-selector {
      position: relative;
    }

    .approver-list {
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: #ffffff;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .approver-item {
      padding: 0.75rem;
      cursor: pointer;
      border-bottom: 1px solid #f3f4f6;
      transition: background-color 0.2s;
    }

    .approver-item:hover {
      background: #f8fafc;
    }

    .approver-item.selected {
      background: #dbeafe;
      border-left: 3px solid #3b82f6;
    }

    .approver-item:last-child {
      border-bottom: none;
    }

    .selected-indicator {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #10b981;
      font-weight: bold;
    }

    .approver-name {
      font-weight: 500;
      color: #374151;
    }

    .approver-email {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      color: #6b7280;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #e5e7eb;
      border-top: 2px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .form-fields-preview {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 0.375rem;
      padding: 0.75rem;
      margin-top: 0.5rem;
    }

    .form-field {
      padding: 0.5rem;
      margin: 0.25rem 0;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      color: #374151;
    }

    .form-note {
      margin-top: 0.75rem;
      padding: 0.5rem;
      background: #eff6ff;
      border: 1px solid #dbeafe;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      color: #1e40af;
      line-height: 1.4;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadUsers();
  }

  private async loadUsers(): Promise<void> {
    this.isLoading = true;
    try {
      this.users = await mockAPI.getUsers();
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private get selectedNode(): ApprovalNode | null {
    if (!this.selectedNodeId || !this.workflow) return null;
    return this.workflow.nodes.find(n => n.id === this.selectedNodeId) || null;
  }

  private onNameChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.updateNodeProperty('name', input.value);
  }

  private onApprovalTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.updateNodeProperty('configuration.approvalType', select.value);
  }

  private onApproverChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.updateNodeProperty('configuration.approver', select.value);
  }

  private onTimeoutChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.updateNodeProperty('configuration.timeout', parseInt(input.value));
  }

  private onTriggerSourceChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.updateNodeProperty('configuration.triggerSource', select.value);
  }

  private onConditionTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.updateNodeProperty('configuration.conditionType', select.value);
  }

  private onOperatorChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.updateNodeProperty('configuration.operator', select.value);
  }

  private onValueChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.updateNodeProperty('configuration.value', input.value);
  }

  private onParallelCountChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.updateNodeProperty('configuration.parallelCount', parseInt(input.value));
  }

  private isApproverSelected(userName: string): boolean {
    const selectedNode = this.selectedNode;
    if (!selectedNode || !selectedNode.configuration.approver) return false;

    if (Array.isArray(selectedNode.configuration.approver)) {
      return selectedNode.configuration.approver.includes(userName);
    } else {
      return selectedNode.configuration.approver === userName;
    }
  }

  private onApproverSelect(user: User): void {
    const selectedNode = this.selectedNode;
    if (!selectedNode) return;

    // Get current approvers (convert single approver to array if needed)
    let currentApprovers: string[] = [];
    if (selectedNode.configuration.approver) {
      if (Array.isArray(selectedNode.configuration.approver)) {
        currentApprovers = [...selectedNode.configuration.approver];
      } else {
        currentApprovers = [selectedNode.configuration.approver];
      }
    }

    // Toggle approver selection
    const approverIndex = currentApprovers.indexOf(user.name);
    if (approverIndex > -1) {
      // Remove approver
      currentApprovers.splice(approverIndex, 1);
    } else {
      // Add approver
      currentApprovers.push(user.name);
    }

    // Update the configuration
    this.updateNodeProperty('configuration.approver', currentApprovers);
  }

  private updateNodeProperty(path: string, value: any): void {
    if (!this.selectedNode) return;

    const keys = path.split('.');
    let current: any = this.selectedNode;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    this.selectedNode.updatedAt = new Date();
    
    this.dispatchEvent(new CustomEvent('property-changed', {
      detail: { nodeId: this.selectedNode.id, path, value },
      bubbles: true
    }));
    
    this.requestUpdate();
  }

  private renderApproverProperties(): any {
    return html`
      <div class="property-group">
        <label class="property-label">Approver Name</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.name || ''}
          @input=${this.onNameChange}>
      </div>
      
      <div class="property-group">
        <label class="property-label">Approval Type</label>
        <select class="property-select" @change=${this.onApprovalTypeChange}>
          <option value="single" ?selected=${this.selectedNode?.configuration.approvalType === 'single'}>
            Single Approval
          </option>
          <option value="any" ?selected=${this.selectedNode?.configuration.approvalType === 'any'}>
            Any Approval
          </option>
        </select>
      </div>
      
      <div class="property-group">
        <label class="property-label">Timeout (days)</label>
        <input 
          type="number" 
          class="property-input"
          .value=${this.selectedNode?.configuration.timeout || 7}
          @input=${this.onTimeoutChange}>
      </div>
      
      <div class="property-group">
        <label class="property-label">Approver Selection</label>
        <p style="font-size: 0.75rem; color: #6b7280; margin: 0.25rem 0 0.5rem 0;">
          💡 Click to select multiple approvers
        </p>
        <div class="approver-selector">
          <div class="approver-list">
            ${this.users.map(user => {
              const isSelected = this.isApproverSelected(user.name);
              return html`
                <div 
                  class="approver-item ${isSelected ? 'selected' : ''}"
                  @click=${() => this.onApproverSelect(user)}>
                  <div class="approver-name">${user.name}</div>
                  <div class="approver-email">${user.email}</div>
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  private renderConditionProperties(): any {
    return html`
      <div class="property-group">
        <label class="property-label">Condition Name</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.name || ''}
          @input=${this.onNameChange}>
      </div>
      
      <div class="property-group">
        <label class="property-label">Condition Type</label>
        <select class="property-select" @change=${this.onConditionTypeChange}>
          <option value="amount" ?selected=${this.selectedNode?.configuration.conditionType === 'amount'}>
            Amount
          </option>
          <option value="department" ?selected=${this.selectedNode?.configuration.conditionType === 'department'}>
            Department
          </option>
          <option value="custom" ?selected=${this.selectedNode?.configuration.conditionType === 'custom'}>
            Custom
          </option>
        </select>
      </div>
      
      <div class="property-group">
        <label class="property-label">Operator</label>
        <select class="property-select" @change=${this.onOperatorChange}>
          <option value="greaterThan" ?selected=${this.selectedNode?.configuration.operator === 'greaterThan'}>
            Greater Than
          </option>
          <option value="lessThan" ?selected=${this.selectedNode?.configuration.operator === 'lessThan'}>
            Less Than
          </option>
          <option value="equals" ?selected=${this.selectedNode?.configuration.operator === 'equals'}>
            Equals
          </option>
        </select>
      </div>
      
      <div class="property-group">
        <label class="property-label">Value</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.configuration.value || ''}
          @input=${this.onValueChange}>
      </div>
    `;
  }

  private renderParallelProperties(): any {
    return html`
      <div class="property-group">
        <label class="property-label">Parallel Name</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.name || ''}
          @input=${this.onNameChange}>
      </div>
      
      <div class="property-group">
        <label class="property-label">Number of Approvers</label>
        <input 
          type="number" 
          class="property-input"
          .value=${this.selectedNode?.configuration.parallelCount || 2}
          @input=${this.onParallelCountChange}>
      </div>
      
      <div class="property-group">
        <label class="property-label">Approval Type</label>
        <select class="property-select" @change=${this.onApprovalTypeChange}>
          <option value="all" ?selected=${this.selectedNode?.configuration.approvalType === 'all'}>
            All Must Approve
          </option>
          <option value="any" ?selected=${this.selectedNode?.configuration.approvalType === 'any'}>
            Any Can Approve
          </option>
        </select>
      </div>
    `;
  }

  private renderDefaultProperties(): any {
    if (this.selectedNode?.type === 'start') {
      return this.renderStartProperties();
    }
    
    return html`
      <div class="property-group">
        <label class="property-label">Node Name</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.name || ''}
          @input=${this.onNameChange}>
      </div>
    `;
  }

  private renderStartProperties(): any {
    return html`
      <div class="property-group">
        <label class="property-label">Node Name</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.name || ''}
          @input=${this.onNameChange}>
      </div>
      
      <div class="property-group">
        <label class="property-label">Trigger Source</label>
        <select class="property-select" @change=${this.onTriggerSourceChange}>
          <option value="catalog" ?selected=${this.selectedNode?.configuration.triggerSource === 'catalog'}>
            ServiceNow Catalog Item
          </option>
          <option value="form" ?selected=${this.selectedNode?.configuration.triggerSource === 'form'}>
            Custom Form
          </option>
          <option value="api" ?selected=${this.selectedNode?.configuration.triggerSource === 'api'}>
            API Call
          </option>
        </select>
      </div>
      
      <div class="property-group">
        <label class="property-label">Form Fields</label>
        <div class="form-fields-preview">
          <div class="form-field">📝 Item Description</div>
          <div class="form-field">💰 Estimated Cost</div>
          <div class="form-field">📊 Quantity</div>
          <div class="form-field">🏢 Business Justification</div>
          <div class="form-field">🏪 Vendor Information</div>
        </div>
        <p class="form-note">💡 Employee fills out ServiceNow catalog form, which triggers this workflow</p>
      </div>
    `;
  }

  private renderNodeProperties(): any {
    if (!this.selectedNode) return html``;

    switch (this.selectedNode.type) {
      case 'approver':
        return this.renderApproverProperties();
      case 'condition':
        return this.renderConditionProperties();
      case 'parallel':
        return this.renderParallelProperties();
      default:
        return this.renderDefaultProperties();
    }
  }

  render() {
    if (!this.selectedNode) {
      return html`
        <div class="properties">
          <div class="properties-header">
            <h3>Properties</h3>
          </div>
          <div class="properties-content">
            <div class="no-selection">
              <div class="no-selection-icon">📋</div>
              <h4>No Selection</h4>
              <p>Select a node to configure its properties</p>
            </div>
          </div>
        </div>
      `;
    }

    return html`
      <div class="properties">
        <div class="properties-header">
          <h3>Properties</h3>
          <div class="node-type">${this.selectedNode.type}</div>
        </div>
        
        <div class="properties-content">
          <div class="node-info">
            <div class="node-type">${this.selectedNode.type}</div>
            <h4>${this.selectedNode.name}</h4>
            <p>Configure the properties for this approval node</p>
          </div>
          
          ${this.renderNodeProperties()}
        </div>
      </div>
    `;
  }
}
