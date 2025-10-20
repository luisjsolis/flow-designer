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

  private async saveWorkflow(): Promise<void> {
    if (!this.workflow) return;
    
    this.isLoading = true;
    try {
      await mockAPI.saveFlowDefinition(this.workflow);
      eventBus.emit(EVENTS.WORKFLOW_SAVED, this.workflow);
    } catch (error) {
      console.error('Failed to save workflow:', error);
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
            <button @click=${this.saveWorkflow} ?disabled=${this.isLoading}>
              💾 Save
            </button>
            <button @click=${this.validateWorkflow} ?disabled=${this.isLoading}>
              🔍 Validate
            </button>
            <button class="primary" ?disabled=${this.isLoading}>
              ▶️ Test
            </button>
            
            <div class="status-indicator ${this.getStatusIndicator()}">
              ${this.getStatusText()}
            </div>
          </div>

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
