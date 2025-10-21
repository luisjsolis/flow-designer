import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ApprovalWorkflow } from '../types';
import { eventBus, EVENTS } from '../utils/event-bus';
import { mockAPI } from '../services/mock-api';

@customElement('approval-builder')
export class ApprovalBuilder extends LitElement {
  @property({ type: Object }) workflow: ApprovalWorkflow | null = null;
  @state() private isLoading = false;
  @state() private selectedNodeId: string | null = null;

  static styles = css`
    :host {
      display: flex;
      height: 100%;
      width: 100%;
    }

    .approval-builder {
      display: flex;
      height: 100%;
      width: 100%;
      background: #ffffff;
    }

    .left-panel {
      min-width: 250px;
      width: 15vw;
      background: #f8f9fa;
      border-right: 1px solid #e9ecef;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      min-width: 0;
      width: 100%;
    }

    .right-panel {
      min-width: 250px;
      width: 15vw;
      background: #f8f9fa;
      border-left: 1px solid #e9ecef;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }

    .toolbar {
      height: 60px;
      background: #ffffff;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      gap: 1rem;
    }

    .toolbar button {
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: #ffffff;
      color: #374151;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s;
    }

    .toolbar button:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    .toolbar button.primary {
      background: #3b82f6;
      color: #ffffff;
      border-color: #3b82f6;
    }

    .toolbar button.primary:hover {
      background: #2563eb;
    }

    .toolbar button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .status-indicator {
      margin-left: auto;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status-indicator.valid {
      background: #dcfce7;
      color: #166534;
    }

    .status-indicator.invalid {
      background: #fef2f2;
      color: #dc2626;
    }

    .status-indicator.loading {
      background: #fef3c7;
      color: #d97706;
    }

    .workflow-info {
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .workflow-title h3 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: #374151;
    }

    .workflow-title p {
      margin: 0.25rem 0 0 0;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .workflow-tools {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .workflow-tools button {
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: rgba(255, 255, 255, 0.9);
      color: #374151;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    .workflow-tools button:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    .workflow-hints p {
      margin: 0;
      font-size: 0.75rem;
      color: #6b7280;
      font-style: italic;
    }

    .canvas-container {
      flex: 1;
      position: relative;
      overflow: hidden;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e5e7eb;
      border-top: 4px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.setupEventListeners();
    this.loadWorkflow();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  private boundOnNodeSelected = this.onNodeSelected.bind(this);
  private boundOnWorkflowUpdated = this.onWorkflowUpdated.bind(this);

  private setupEventListeners(): void {
    eventBus.on(EVENTS.NODE_SELECTED, this.boundOnNodeSelected);
    eventBus.on(EVENTS.WORKFLOW_UPDATED, this.boundOnWorkflowUpdated);
  }

  private removeEventListeners(): void {
    eventBus.off(EVENTS.NODE_SELECTED, this.boundOnNodeSelected);
    eventBus.off(EVENTS.WORKFLOW_UPDATED, this.boundOnWorkflowUpdated);
  }

  private onNodeSelected(node: any): void {
    try {
      this.selectedNodeId = node ? node.id : null;
      console.log('Node selected:', node ? node.id : 'none');
    } catch (error) {
      console.error('Error in onNodeSelected:', error);
      this.selectedNodeId = null;
    }
  }

  private onWorkflowUpdated(workflow: ApprovalWorkflow): void {
    this.workflow = workflow;
  }

  private async loadWorkflow(): Promise<void> {
    this.isLoading = true;
    try {
      const workflow = await mockAPI.getFlowDefinition('sample-flow-001');
      this.workflow = workflow;
    } catch (error) {
      console.error('Failed to load workflow:', error);
    } finally {
      this.isLoading = false;
    }
  }


  private async validateWorkflow(): Promise<void> {
    if (!this.workflow) return;
    
    this.isLoading = true;
    try {
      const validation = await mockAPI.validateFlow(this.workflow);
      eventBus.emit(EVENTS.WORKFLOW_VALIDATED, validation);
    } catch (error) {
      console.error('Failed to validate workflow:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private getStatusIndicator(): string {
    if (this.isLoading) return 'loading';
    if (!this.workflow) return 'invalid';
    return 'valid';
  }

  private getStatusText(): string {
    if (this.isLoading) return '⏳ Loading...';
    if (!this.workflow) return '❌ No workflow';
    return '✅ Valid workflow';
  }

  private addNode(type: 'start' | 'end' | 'approver' | 'condition' | 'parallel'): void {
    // Create a new workflow if none exists
    if (!this.workflow) {
      this.workflow = {
        id: 'new-workflow',
        name: 'New Workflow',
        description: 'A new approval workflow',
        version: '1.0.0',
        nodes: [],
        connections: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    
    const node = {
      id: `node_${Date.now()}`,
      type: type,
      name: this.getDefaultNodeName(type),
      position: { x: 0, y: 0 },
      configuration: this.getDefaultConfiguration(type),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.workflow.nodes.push(node);
    eventBus.emit(EVENTS.WORKFLOW_UPDATED, this.workflow);
    this.requestUpdate();
  }

  private getDefaultNodeName(type: 'start' | 'end' | 'approver' | 'condition' | 'parallel'): string {
    const names = {
      'start': 'Start',
      'end': 'End',
      'approver': 'Approver',
      'condition': 'Condition',
      'parallel': 'Parallel Approvers'
    };
    return names[type as keyof typeof names] || 'Node';
  }

  private getDefaultConfiguration(type: 'start' | 'end' | 'approver' | 'condition' | 'parallel'): any {
    const configs = {
      'approver': { approvalType: 'single', timeout: 7 },
      'condition': { conditionType: 'amount', operator: 'greaterThan' },
      'parallel': { approvalType: 'all', timeout: 7, parallelCount: 2 },
      'start': {},
      'end': {}
    };
    return configs[type as keyof typeof configs] || {};
  }

  private clearCanvas(): void {
    if (this.workflow) {
      this.workflow.nodes = [];
      this.workflow.connections = [];
      eventBus.emit(EVENTS.WORKFLOW_UPDATED, this.workflow);
      this.requestUpdate();
    }
  }

  private createSampleWorkflow(): void {
    console.log('📋 Create Sample Workflow button clicked!');
    alert('Create Sample Workflow button clicked!');
    
    // Create a new workflow if none exists
    if (!this.workflow) {
      console.log('📋 Creating new workflow...');
      this.workflow = {
        id: 'sample-workflow',
        name: 'Sample Approval Flow',
        description: 'A sample purchase approval workflow',
        version: '1.0.0',
        nodes: [],
        connections: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } else {
      console.log('📋 Clearing existing workflow...');
      // Clear existing nodes
      this.workflow.nodes = [];
      this.workflow.connections = [];
    }

    // Create a realistic purchase approval workflow - CSS Grid will handle positioning
    const nodes = [
      { 
        type: 'start', 
        name: 'Employee Submits Purchase Request', 
        x: 0, 
        y: 0,
        config: { description: 'Employee fills out purchase request form' }
      },
      { 
        type: 'approver', 
        name: 'Direct Manager Approval', 
        x: 0, 
        y: 0,
        config: { 
          approver: 'Sarah Johnson', 
          approvalType: 'single', 
          timeout: 24,
          description: 'Direct manager reviews and approves request'
        }
      },
      { 
        type: 'condition', 
        name: 'Amount > $5,000?', 
        x: 0, 
        y: 0,
        config: { 
          field: 'amount', 
          operator: '>', 
          value: 5000,
          description: 'Check if amount exceeds $5,000 threshold'
        }
      },
      { 
        type: 'approver', 
        name: 'Finance Director Approval', 
        x: 0, 
        y: 0,
        config: { 
          approver: 'Michael Chen', 
          approvalType: 'single', 
          timeout: 48,
          description: 'Finance director approval for high-value purchases'
        }
      },
      { 
        type: 'end', 
        name: 'Purchase Order Generated', 
        x: 0, 
        y: 0,
        config: { description: 'System generates purchase order and notifies vendor' }
      }
    ];

    // Add nodes
    console.log('📋 Creating', nodes.length, 'nodes...');
    nodes.forEach((nodeData, index) => {
      const node = {
        id: `node_${Date.now()}_${Math.random()}`,
        type: nodeData.type as 'start' | 'end' | 'approver' | 'condition' | 'parallel',
        name: nodeData.name,
        position: { x: nodeData.x, y: nodeData.y },
        configuration: nodeData.config,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.workflow!.nodes.push(node);
      console.log(`📋 Created node ${index + 1}: ${node.name} (${node.type})`);
    });
    console.log('📋 Total nodes created:', this.workflow.nodes.length);

    console.log('📋 Emitting workflow update event...');
    eventBus.emit(EVENTS.WORKFLOW_UPDATED, this.workflow);
    console.log('📋 Requesting update...');
    this.requestUpdate();
    console.log('✅ Sample workflow creation completed!');
  }

  private autoArrange(): void {
    if (!this.workflow || this.workflow.nodes.length === 0) return;

    // Sort nodes by type priority (start first, end last)
    const typePriority = { 'start': 0, 'approver': 1, 'condition': 2, 'parallel': 3, 'end': 4 };
    const sortedNodes = [...this.workflow.nodes].sort((a, b) => {
      const aPriority = typePriority[a.type] ?? 5;
      const bPriority = typePriority[b.type] ?? 5;
      return aPriority - bPriority;
    });

    // CSS Grid will handle positioning automatically
    this.workflow.nodes = sortedNodes;

    eventBus.emit(EVENTS.WORKFLOW_UPDATED, this.workflow);
    this.requestUpdate();
  }

  private async saveWorkflow(): Promise<void> {
    if (!this.workflow) return;

    this.isLoading = true;
    console.log('💾 Saving workflow to ServiceNow...');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock success response
      const workflowId = `WF-${Date.now()}`;
      this.workflow.id = workflowId;
      
      console.log('✅ Workflow saved successfully:', workflowId);
      this.showSuccessMessage(`✅ Workflow ${workflowId} saved to ServiceNow!`);
      
    } catch (error) {
      console.error('❌ Failed to save workflow:', error);
      this.showErrorMessage('❌ Failed to save workflow. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  private async deployWorkflow(): Promise<void> {
    if (!this.workflow) return;

    // Show workflow summary first
    const summary = this.generateWorkflowSummary();
    const confirmed = confirm(
      `Deploy this workflow?\n\n` +
      `Name: ${summary.name}\n` +
      `Steps: ${summary.nodeCount}\n` +
      `Approvers: ${summary.approvers.join(', ')}\n` +
      `Est. Processing Time: ${summary.estimatedProcessingTime}\n\n` +
      `This will make the workflow active for all users.`
    );

    if (!confirmed) return;

    this.isLoading = true;
    console.log('🚀 Deploying workflow to ServiceNow...');

    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 3000));

      const workflowId = this.workflow.id || `WF-${Date.now()}`;
      
      console.log('✅ Workflow deployed successfully:', workflowId);
      this.showSuccessMessage(`🚀 Workflow ${workflowId} is now LIVE in ServiceNow!`);
      
    } catch (error) {
      console.error('❌ Failed to deploy workflow:', error);
      this.showErrorMessage('❌ Failed to deploy workflow. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  private async testWorkflow(): Promise<void> {
    if (!this.workflow) return;

    this.isLoading = true;
    console.log('🧪 Testing workflow execution...');

    try {
      // Simulate test execution
      await new Promise(resolve => setTimeout(resolve, 4000));

      const testResults = {
        totalSteps: this.workflow.nodes.length,
        completedSteps: this.workflow.nodes.length,
        executionTime: '2.3 seconds',
        status: 'PASSED'
      };

      console.log('✅ Workflow test completed:', testResults);
      this.showSuccessMessage(
        `🧪 Test Results: ${testResults.status}\n` +
        `Steps: ${testResults.completedSteps}/${testResults.totalSteps}\n` +
        `Execution Time: ${testResults.executionTime}`
      );
      
    } catch (error) {
      console.error('❌ Workflow test failed:', error);
      this.showErrorMessage('❌ Workflow test failed. Please check your configuration.');
    } finally {
      this.isLoading = false;
    }
  }

  private generateWorkflowSummary(): any {
    if (!this.workflow) return {};

    const approvers = this.workflow.nodes
      .filter(n => n.type === 'approver')
      .map(n => n.configuration.approver || 'Unassigned');

    const totalTimeout = this.workflow.nodes
      .filter(n => n.type === 'approver')
      .reduce((sum, n) => sum + (n.configuration.timeout || 0), 0);

    return {
      name: this.workflow.name,
      nodeCount: this.workflow.nodes.length,
      connectionCount: this.workflow.connections.length,
      approvers: approvers,
      estimatedProcessingTime: `${totalTimeout} hours`,
      lastModified: new Date().toLocaleString()
    };
  }

  private showSuccessMessage(message: string): void {
    // Simple alert for demo - in production would use a toast notification
    alert(message);
  }

  private showErrorMessage(message: string): void {
    // Simple alert for demo - in production would use a toast notification
    alert(message);
  }

  render() {
    return html`
      <div class="approval-builder">
        <!-- Left Panel - Approval Palette -->
        <div class="left-panel">
          <approval-palette></approval-palette>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <!-- Toolbar -->
          <div class="toolbar">
            <button @click=${() => this.saveWorkflow()} ?disabled=${this.isLoading}>
              💾 Save
            </button>
            <button @click=${() => this.validateWorkflow()} ?disabled=${this.isLoading}>
              🔍 Validate
            </button>
            <button @click=${() => this.deployWorkflow()} class="primary" ?disabled=${this.isLoading}>
              🚀 Deploy
            </button>
            <button @click=${() => this.testWorkflow()} ?disabled=${this.isLoading}>
              🧪 Test
            </button>
            
            <div class="status-indicator ${this.getStatusIndicator()}">
              ${this.getStatusText()}
            </div>
          </div>

          <!-- Workflow Info with Tool Buttons -->
          ${this.workflow ? html`
            <div class="workflow-info">
              <div class="workflow-title">
                <h3>${this.workflow.name}</h3>
                <p>${this.workflow.nodes.length} nodes, ${this.workflow.connections.length} connections</p>
              </div>
              <div class="workflow-tools">
                <button @click=${() => this.addNode('start')} title="Add Start">🚀</button>
                <button @click=${() => this.addNode('approver')} title="Add Approver">👤</button>
                <button @click=${() => this.addNode('condition')} title="Add Condition">❓</button>
                <button @click=${() => this.addNode('end')} title="Add End">🏁</button>
                <button @click=${() => this.clearCanvas()} title="Clear Canvas" style="background: #dc3545;">🗑️</button>
                <button @click=${() => this.createSampleWorkflow()} title="Create Sample Workflow" style="background: #fd7e14;">📋</button>
                <button @click=${() => this.autoArrange()} title="Auto Arrange" style="background: #20c997;">🔄</button>
              </div>
              <div class="workflow-hints">
                <p>💡 Try: 1) Click 📋 for sample workflow 2) Click elements in left panel to add 3) Use ⬆️⬇️ to reorder</p>
              </div>
            </div>
          ` : ''}

          <!-- Canvas Container -->
          <div class="canvas-container">
            ${this.isLoading ? html`
              <div class="loading-overlay">
                <div class="loading-spinner"></div>
              </div>
            ` : ''}
            
            <approval-canvas 
              .workflow=${this.workflow}
              .selectedNodeId=${this.selectedNodeId}>
            </approval-canvas>
          </div>
        </div>

        <!-- Right Panel - Properties -->
        <div class="right-panel">
          <approval-properties 
            .selectedNodeId=${this.selectedNodeId}
            .workflow=${this.workflow}>
          </approval-properties>
        </div>
      </div>
    `;
  }
}
