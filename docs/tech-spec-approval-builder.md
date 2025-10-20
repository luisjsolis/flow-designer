# Visual Approval Workflow Builder - Technical Specification

## Executive Summary

The **Visual Approval Workflow Builder** addresses the #1 customer pain point: Complex Approval Workflows (40% of support tickets). This feature provides an intuitive, drag-and-drop interface for building approval chains with conditional logic, parallel approvals, and smart routing - all built with modern Web Components architecture.

## Problem Statement

### Current Pain Points
- **40% of support tickets** related to approval workflows
- **Average setup time**: 4-6 hours for complex approvals
- **High abandonment rate** for approval flow creation
- **No visual approval chain builder**
- **Limited conditional approval logic**
- **No parallel approval support**
- **Poor error messages during setup**

### Customer Impact
- **Frustrated users** who can't build approval workflows
- **Long setup times** for common business processes
- **High support burden** for approval-related issues
- **Reduced productivity** due to complex configuration

## Solution Overview

### Core Features
1. **Visual Approval Chain Builder** - Drag-and-drop approval routing
2. **Conditional Logic Engine** - Smart routing based on data/context
3. **Parallel Approval Support** - Multiple approvers simultaneously
4. **Approval Templates** - Pre-built common patterns
5. **Smart Validation** - Real-time error checking and suggestions
6. **Modern UX** - Intuitive, responsive interface

### Business Value
- **70% reduction** in approval workflow setup time
- **50% fewer support tickets** for approval issues
- **90% user satisfaction** with approval building experience
- **Faster time-to-market** for new business processes

## Technical Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    APPROVAL WORKFLOW BUILDER                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ ApprovalPalette │  │ ApprovalCanvas  │  │ PropertyPanel   │ │
│  │ (templates)     │  │ (main editor)   │  │ (configuration) │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│           │                     │                     │         │
│           └─────────────────────┼─────────────────────┘         │
│                                 │                               │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                ApprovalEngine                              │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │ │
│  │  │ Validator   │  │ Router      │  │ Executor    │       │ │
│  │  │ (validation)│  │ (logic)     │  │ (execution) │       │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVICENOW INTEGRATION                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ ApprovalAPI     │  │ UserService     │  │ NotificationAPI │ │
│  │ (workflows)     │  │ (approvers)     │  │ (alerts)        │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Core Components

#### 1. ApprovalCanvas (Main Editor)

```typescript
@customElement('approval-canvas')
export class ApprovalCanvas extends LitElement {
  @property({ type: Object }) approvalWorkflow: ApprovalWorkflow;
  @property({ type: Object }) selectedNode: ApprovalNode | null = null;
  @property({ type: Boolean }) isValid: boolean = true;
  @property({ type: Array }) validationErrors: ValidationError[] = [];

  private approvalEngine: ApprovalEngine;
  private eventBus: EventBus;

  connectedCallback() {
    super.connectedCallback();
    this.approvalEngine = new ApprovalEngine();
    this.eventBus = new EventBus();
    this.setupEventListeners();
  }

  render() {
    return html`
      <div class="approval-canvas">
        <!-- Canvas Header -->
        <div class="canvas-header">
          <h3>${this.approvalWorkflow.name}</h3>
          <div class="validation-status ${this.isValid ? 'valid' : 'invalid'}">
            ${this.isValid ? '✅ Valid' : `❌ ${this.validationErrors.length} issues`}
          </div>
        </div>

        <!-- Main Canvas Area -->
        <div class="canvas-content" @drop=${this.onDrop} @dragover=${this.onDragOver}>
          <!-- Approval Flow Visualization -->
          <div class="approval-flow">
            ${this.approvalWorkflow.nodes.map(node => html`
              <approval-node 
                .node=${node}
                .isSelected=${node.id === this.selectedNode?.id}
                @node-select=${this.onNodeSelect}
                @node-edit=${this.onNodeEdit}
                @node-delete=${this.onNodeDelete}>
              </approval-node>
            `)}
            
            <!-- Connection Lines -->
            <connection-layer 
              .connections=${this.approvalWorkflow.connections}
              .nodes=${this.approvalWorkflow.nodes}>
            </connection-layer>
          </div>
        </div>

        <!-- Validation Panel -->
        ${!this.isValid ? html`
          <validation-panel 
            .errors=${this.validationErrors}
            @fix-error=${this.onFixError}>
          </validation-panel>
        ` : ''}
      </div>
    `;
  }

  private async onDrop(event: DragEvent) {
    event.preventDefault();
    const nodeType = event.dataTransfer?.getData('text/plain');
    
    if (nodeType) {
      const position = this.getDropPosition(event);
      await this.addApprovalNode(nodeType, position);
    }
  }

  private async addApprovalNode(type: string, position: Position): Promise<void> {
    const node = await this.approvalEngine.createNode(type, position);
    this.approvalWorkflow.addNode(node);
    await this.validateWorkflow();
    this.requestUpdate();
  }

  private async validateWorkflow(): Promise<void> {
    const validation = await this.approvalEngine.validate(this.approvalWorkflow);
    this.isValid = validation.isValid;
    this.validationErrors = validation.errors;
  }
}
```

#### 2. ApprovalNode (Individual Approval Steps)

```typescript
@customElement('approval-node')
export class ApprovalNode extends LitElement {
  @property({ type: Object }) node: ApprovalNode;
  @property({ type: Boolean }) isSelected: boolean = false;

  render() {
    return html`
      <div 
        class="approval-node ${this.node.type} ${this.isSelected ? 'selected' : ''}"
        style="left: ${this.node.position.x}px; top: ${this.node.position.y}px;"
        @click=${this.onSelect}
        @dblclick=${this.onEdit}>
        
        <!-- Node Header -->
        <div class="node-header">
          <div class="node-icon">${this.getNodeIcon()}</div>
          <div class="node-title">${this.node.name}</div>
          <div class="node-actions">
            <button @click=${this.onEdit} class="edit-btn">✏️</button>
            <button @click=${this.onDelete} class="delete-btn">🗑️</button>
          </div>
        </div>

        <!-- Node Content -->
        <div class="node-content">
          ${this.renderNodeContent()}
        </div>

        <!-- Connection Points -->
        <div class="connection-points">
          <div class="input-point" data-connection="input"></div>
          <div class="output-point" data-connection="output"></div>
        </div>
      </div>
    `;
  }

  private renderNodeContent(): TemplateResult {
    switch (this.node.type) {
      case 'approver':
        return html`
          <div class="approver-info">
            <div class="approver-name">${this.node.approver?.name || 'Select Approver'}</div>
            <div class="approval-type">${this.node.approvalType}</div>
          </div>
        `;
      
      case 'condition':
        return html`
          <div class="condition-info">
            <div class="condition-text">${this.node.condition?.description || 'Set Condition'}</div>
          </div>
        `;
      
      case 'parallel':
        return html`
          <div class="parallel-info">
            <div class="parallel-count">${this.node.parallelCount} approvers</div>
          </div>
        `;
      
      default:
        return html`<div class="default-content">${this.node.name}</div>`;
    }
  }

  private getNodeIcon(): string {
    switch (this.node.type) {
      case 'approver': return '👤';
      case 'condition': return '❓';
      case 'parallel': return '⚡';
      case 'start': return '🚀';
      case 'end': return '🏁';
      default: return '📋';
    }
  }

  private onSelect(): void {
    this.dispatchEvent(new CustomEvent('node-select', {
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
    this.dispatchEvent(new CustomEvent('node-delete', {
      detail: { node: this.node },
      bubbles: true
    }));
  }
}
```

#### 3. ApprovalPalette (Template Library)

```typescript
@customElement('approval-palette')
export class ApprovalPalette extends LitElement {
  @property({ type: Array }) templates: ApprovalTemplate[] = [];
  @property({ type: Array }) nodeTypes: NodeType[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.loadTemplates();
    this.loadNodeTypes();
  }

  render() {
    return html`
      <div class="approval-palette">
        <div class="palette-header">
          <h3>Approval Builder</h3>
        </div>

        <!-- Quick Templates -->
        <div class="templates-section">
          <h4>Quick Templates</h4>
          <div class="templates-grid">
            ${this.templates.map(template => html`
              <div 
                class="template-item"
                draggable="true"
                @dragstart=${(e) => this.onTemplateDragStart(e, template)}>
                <div class="template-icon">${template.icon}</div>
                <div class="template-name">${template.name}</div>
                <div class="template-description">${template.description}</div>
              </div>
            `)}
          </div>
        </div>

        <!-- Node Types -->
        <div class="node-types-section">
          <h4>Approval Elements</h4>
          <div class="node-types-list">
            ${this.nodeTypes.map(nodeType => html`
              <div 
                class="node-type-item"
                draggable="true"
                @dragstart=${(e) => this.onNodeTypeDragStart(e, nodeType)}>
                <div class="node-type-icon">${nodeType.icon}</div>
                <div class="node-type-name">${nodeType.name}</div>
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  }

  private onTemplateDragStart(event: DragEvent, template: ApprovalTemplate): void {
    event.dataTransfer?.setData('text/plain', `template:${template.id}`);
  }

  private onNodeTypeDragStart(event: DragEvent, nodeType: NodeType): void {
    event.dataTransfer?.setData('text/plain', `node:${nodeType.type}`);
  }

  private async loadTemplates(): Promise<void> {
    this.templates = [
      {
        id: 'simple-approval',
        name: 'Simple Approval',
        description: 'Single approver workflow',
        icon: '👤',
        nodes: [
          { type: 'start', name: 'Start' },
          { type: 'approver', name: 'Manager Approval' },
          { type: 'end', name: 'Complete' }
        ]
      },
      {
        id: 'parallel-approval',
        name: 'Parallel Approval',
        description: 'Multiple approvers simultaneously',
        icon: '⚡',
        nodes: [
          { type: 'start', name: 'Start' },
          { type: 'parallel', name: 'Parallel Approvers' },
          { type: 'end', name: 'Complete' }
        ]
      },
      {
        id: 'conditional-approval',
        name: 'Conditional Approval',
        description: 'Approval based on conditions',
        icon: '❓',
        nodes: [
          { type: 'start', name: 'Start' },
          { type: 'condition', name: 'Check Amount' },
          { type: 'approver', name: 'Manager Approval' },
          { type: 'end', name: 'Complete' }
        ]
      }
    ];
  }

  private async loadNodeTypes(): Promise<void> {
    this.nodeTypes = [
      { type: 'approver', name: 'Approver', icon: '👤' },
      { type: 'condition', name: 'Condition', icon: '❓' },
      { type: 'parallel', name: 'Parallel', icon: '⚡' },
      { type: 'start', name: 'Start', icon: '🚀' },
      { type: 'end', name: 'End', icon: '🏁' }
    ];
  }
}
```

#### 4. ApprovalEngine (Core Logic)

```typescript
export class ApprovalEngine {
  private validator: ApprovalValidator;
  private router: ApprovalRouter;
  private executor: ApprovalExecutor;

  constructor() {
    this.validator = new ApprovalValidator();
    this.router = new ApprovalRouter();
    this.executor = new ApprovalExecutor();
  }

  async createNode(type: string, position: Position): Promise<ApprovalNode> {
    const node: ApprovalNode = {
      id: generateId(),
      type: type as NodeType,
      name: this.getDefaultName(type),
      position,
      createdAt: new Date(),
      configuration: this.getDefaultConfiguration(type)
    };

    return node;
  }

  async validate(workflow: ApprovalWorkflow): Promise<ValidationResult> {
    const errors: ValidationError[] = [];

    // Check for required nodes
    if (!workflow.nodes.some(n => n.type === 'start')) {
      errors.push({
        type: 'missing-start',
        message: 'Workflow must have a start node',
        severity: 'error'
      });
    }

    if (!workflow.nodes.some(n => n.type === 'end')) {
      errors.push({
        type: 'missing-end',
        message: 'Workflow must have an end node',
        severity: 'error'
      });
    }

    // Check for orphaned nodes
    const connectedNodes = this.getConnectedNodes(workflow);
    const orphanedNodes = workflow.nodes.filter(n => !connectedNodes.includes(n.id));
    
    orphanedNodes.forEach(node => {
      errors.push({
        type: 'orphaned-node',
        message: `Node "${node.name}" is not connected to the workflow`,
        severity: 'warning',
        nodeId: node.id
      });
    });

    // Check for circular dependencies
    const circularDeps = this.detectCircularDependencies(workflow);
    circularDeps.forEach(circle => {
      errors.push({
        type: 'circular-dependency',
        message: 'Circular dependency detected in approval chain',
        severity: 'error',
        nodeIds: circle
      });
    });

    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors
    };
  }

  async execute(workflow: ApprovalWorkflow, request: ApprovalRequest): Promise<ExecutionResult> {
    const execution = await this.executor.execute(workflow, request);
    return execution;
  }

  private getDefaultName(type: string): string {
    const names = {
      'approver': 'Approver',
      'condition': 'Condition',
      'parallel': 'Parallel Approvers',
      'start': 'Start',
      'end': 'End'
    };
    return names[type] || 'Node';
  }

  private getDefaultConfiguration(type: string): any {
    const configs = {
      'approver': { approvalType: 'single', timeout: 7 },
      'condition': { conditionType: 'amount', operator: 'greaterThan' },
      'parallel': { approvalType: 'all', timeout: 7 },
      'start': {},
      'end': {}
    };
    return configs[type] || {};
  }
}
```

#### 5. PropertyPanel (Configuration Interface)

```typescript
@customElement('approval-property-panel')
export class ApprovalPropertyPanel extends LitElement {
  @property({ type: Object }) selectedNode: ApprovalNode | null = null;
  @property({ type: Object }) workflow: ApprovalWorkflow;

  render() {
    if (!this.selectedNode) {
      return html`
        <div class="property-panel">
          <div class="panel-header">
            <h3>Properties</h3>
          </div>
          <div class="panel-content">
            <p>Select a node to configure its properties</p>
          </div>
        </div>
      `;
    }

    return html`
      <div class="property-panel">
        <div class="panel-header">
          <h3>Properties</h3>
          <div class="node-type">${this.getNodeTypeLabel()}</div>
        </div>
        
        <div class="panel-content">
          ${this.renderNodeProperties()}
        </div>
      </div>
    `;
  }

  private renderNodeProperties(): TemplateResult {
    switch (this.selectedNode?.type) {
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

  private renderApproverProperties(): TemplateResult {
    return html`
      <div class="approver-properties">
        <div class="property-group">
          <label>Approver Name</label>
          <input 
            type="text" 
            .value=${this.selectedNode.name}
            @input=${this.onNameChange}>
        </div>
        
        <div class="property-group">
          <label>Approval Type</label>
          <select @change=${this.onApprovalTypeChange}>
            <option value="single" ?selected=${this.selectedNode.configuration.approvalType === 'single'}>
              Single Approval
            </option>
            <option value="any" ?selected=${this.selectedNode.configuration.approvalType === 'any'}>
              Any Approval
            </option>
          </select>
        </div>
        
        <div class="property-group">
          <label>Timeout (days)</label>
          <input 
            type="number" 
            .value=${this.selectedNode.configuration.timeout}
            @input=${this.onTimeoutChange}>
        </div>
        
        <div class="property-group">
          <label>Approver Selection</label>
          <approver-selector 
            .selectedApprover=${this.selectedNode.approver}
            @approver-change=${this.onApproverChange}>
          </approver-selector>
        </div>
      </div>
    `;
  }

  private renderConditionProperties(): TemplateResult {
    return html`
      <div class="condition-properties">
        <div class="property-group">
          <label>Condition Name</label>
          <input 
            type="text" 
            .value=${this.selectedNode.name}
            @input=${this.onNameChange}>
        </div>
        
        <div class="property-group">
          <label>Condition Type</label>
          <select @change=${this.onConditionTypeChange}>
            <option value="amount" ?selected=${this.selectedNode.configuration.conditionType === 'amount'}>
              Amount
            </option>
            <option value="department" ?selected=${this.selectedNode.configuration.conditionType === 'department'}>
              Department
            </option>
            <option value="custom" ?selected=${this.selectedNode.configuration.conditionType === 'custom'}>
              Custom
            </option>
          </select>
        </div>
        
        <div class="property-group">
          <label>Operator</label>
          <select @change=${this.onOperatorChange}>
            <option value="greaterThan" ?selected=${this.selectedNode.configuration.operator === 'greaterThan'}>
              Greater Than
            </option>
            <option value="lessThan" ?selected=${this.selectedNode.configuration.operator === 'lessThan'}>
              Less Than
            </option>
            <option value="equals" ?selected=${this.selectedNode.configuration.operator === 'equals'}>
              Equals
            </option>
          </select>
        </div>
        
        <div class="property-group">
          <label>Value</label>
          <input 
            type="text" 
            .value=${this.selectedNode.configuration.value}
            @input=${this.onValueChange}>
        </div>
      </div>
    `;
  }

  private onNameChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.updateNodeProperty('name', input.value);
  }

  private onApprovalTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.updateNodeProperty('configuration.approvalType', select.value);
  }

  private updateNodeProperty(path: string, value: any): void {
    this.dispatchEvent(new CustomEvent('node-update', {
      detail: { nodeId: this.selectedNode?.id, path, value },
      bubbles: true
    }));
  }
}
```

## User Experience Design

### Approval Builder UI Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                    APPROVAL WORKFLOW BUILDER                   │
├─────────────────────────────────────────────────────────────────┤
│ [💾] [▶] [⏸] [🔍] [⚙️] [👤]                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────────────────────────┐   │
│  │ APPROVAL BUILDER│  │            APPROVAL CANVAS          │   │
│  │                 │  │                                     │   │
│  │ Quick Templates │  │  🚀 → 👤 → ❓ → ⚡ → 👤 → 🏁        │   │
│  │ • Simple        │  │                                     │   │
│  │ • Parallel      │  │  [Start] [Manager] [Check] [Team]   │   │
│  │ • Conditional   │  │                                     │   │
│  │                 │  │                                     │   │
│  │ Approval Elements│  │  ✅ Valid Workflow                 │   │
│  │ • Approver      │  │                                     │   │
│  │ • Condition     │  │                                     │   │
│  │ • Parallel      │  │                                     │   │
│  │ • Start/End     │  │                                     │   │
│  └─────────────────┘  └─────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    PROPERTIES PANEL                        │ │
│  │                                                             │ │
│  │  Selected: Manager Approval                                │ │
│  │  • Name: Manager Approval                                  │ │
│  │  • Type: Single Approval                                   │ │
│  │  • Timeout: 7 days                                         │ │
│  │  • Approver: John Smith                                    │ │
│  │                                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Key User Interactions

1. **Drag Templates** - Drag from palette to canvas for quick setup
2. **Add Nodes** - Drag individual elements to build custom workflows
3. **Connect Nodes** - Draw connections between approval steps
4. **Configure Properties** - Click nodes to set approvers, conditions, timeouts
5. **Validate Workflow** - Real-time validation with error suggestions
6. **Test Workflow** - Simulate approval process with test data

## Implementation Timeline

### Phase 1: Core Architecture (3 days)
- [ ] Web Components setup with Lit
- [ ] Basic ApprovalCanvas with drag-and-drop
- [ ] ApprovalNode components
- [ ] Connection system

### Phase 2: Approval Logic (2 days)
- [ ] ApprovalEngine with validation
- [ ] PropertyPanel for configuration
- [ ] ApprovalPalette with templates
- [ ] Basic approval types (single, parallel, conditional)

### Phase 3: Polish & Integration (2 days)
- [ ] Modern UI design
- [ ] Error handling and validation
- [ ] ServiceNow API integration (mock)
- [ ] Demo preparation

## Success Metrics

### Performance Metrics
- **Setup time reduction**: 70% faster than current Flow Designer
- **Validation accuracy**: 95% of issues caught before execution
- **User satisfaction**: 90% positive feedback on approval building

### Business Metrics
- **Support ticket reduction**: 50% fewer approval-related tickets
- **User adoption**: 80% of users try the new approval builder
- **Workflow completion**: 60% increase in approval workflow creation

## Competitive Advantages

### vs Current Flow Designer
- **Visual approval builder** - no more complex configuration
- **Smart validation** - catches issues before execution
- **Approval templates** - quick setup for common patterns
- **Modern UX** - intuitive drag-and-drop interface

### vs Competitors
- **Enterprise-grade** - built for ServiceNow's scale
- **Deep integration** - works with existing ServiceNow data
- **Advanced logic** - supports complex approval scenarios
- **Web Components** - aligns with ServiceNow's direction

## Conclusion

The Visual Approval Workflow Builder addresses the #1 customer pain point with a modern, intuitive interface that makes building approval workflows fast and easy. Built with Web Components architecture, it provides immediate value while positioning ServiceNow as the leader in enterprise workflow automation.
