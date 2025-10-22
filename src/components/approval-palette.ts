import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ApprovalTemplate } from '../types';
import { mockAPI } from '../services/mock-api';

@customElement('approval-palette')
export class ApprovalPalette extends LitElement {
  @state() private templates: ApprovalTemplate[] = [];
  @state() private isLoading = false;

  static styles = css`
    :host {
      display: block;
      height: 100%;
      background: #f8f9fa;
    }

    .palette {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .palette-header {
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
      background: #ffffff;
    }

    .palette-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
    }

    .palette-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .section {
      margin-bottom: 2rem;
    }

    .section:last-child {
      margin-bottom: 0;
    }

    .section-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .templates-grid {
      display: grid;
      gap: 0.75rem;
    }

    .template-item {
      padding: 1rem;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      cursor: grab;
      transition: all 0.2s;
      user-select: none;
    }

    .template-item:hover {
      border-color: #3b82f6;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    .template-item:active {
      cursor: grabbing;
      transform: scale(0.98);
    }

    .template-item.clickable {
      cursor: pointer;
    }

    .template-item.clickable:hover {
      transform: translateY(-1px);
    }

    .template-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .template-name {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.25rem;
    }

    .template-description {
      font-size: 0.75rem;
      color: #6b7280;
      line-height: 1.4;
    }

    .node-types-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .node-type-item {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      cursor: grab;
      transition: all 0.2s;
      user-select: none;
    }

    .node-type-item:hover {
      border-color: #3b82f6;
      background: #f8fafc;
    }

    .node-type-item:active {
      cursor: grabbing;
      transform: scale(0.98);
    }

    .node-type-item.clickable {
      cursor: pointer;
    }

    .node-type-item.clickable:hover {
      transform: translateY(-1px);
    }

    .node-type-icon {
      font-size: 1.5rem;
      margin-right: 0.75rem;
    }

    .node-type-name {
      font-weight: 500;
      color: #374151;
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
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadTemplates();
  }

  private async loadTemplates(): Promise<void> {
    this.isLoading = true;
    try {
      this.templates = await mockAPI.getApprovalTemplates();
    } catch (error) {
      console.error('Failed to load templates:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private onTemplateClick(template: ApprovalTemplate): void {
    console.log('Template clicked:', template.id);
    // Emit event to add template to workflow
    import('../utils/event-bus.js').then(({ eventBus }) => {
      eventBus.emit('template-add', { template });
    });
  }

  private onNodeTypeClick(nodeType: string): void {
    console.log('🎯 PALETTE: Node type clicked:', nodeType);
    console.log('🎯 PALETTE: Emitting node-type-add event');
    // Emit event to add node to workflow
    import('../utils/event-bus.js').then(({ eventBus }) => {
      eventBus.emit('node-type-add', { nodeType });
      console.log('🎯 PALETTE: Event emitted successfully');
    });
  }

  private getNodeTypeIcon(type: string): string {
    const icons = {
      'start': '🚀',
      'end': '🏁',
      'approver': '👤',
      'condition': '❓',
      'parallel': '⚡'
    };
    return icons[type as keyof typeof icons] || '📋';
  }

  private getNodeTypeName(type: string): string {
    const names = {
      'start': 'Start',
      'end': 'End',
      'approver': 'Approver',
      'condition': 'Condition',
      'parallel': 'Parallel'
    };
    return names[type as keyof typeof names] || type;
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="palette">
          <div class="palette-header">
            <h3>Approval Builder</h3>
          </div>
          <div class="palette-content">
            <div class="loading">
              <div class="loading-spinner"></div>
              Loading templates...
            </div>
          </div>
        </div>
      `;
    }

    return html`
      <div class="palette">
        <div class="palette-header">
          <h3>Approval Builder</h3>
        </div>
        
        <div class="palette-content">
          <!-- Quick Templates -->
          <div class="section">
            <div class="section-title">Quick Templates</div>
            <div class="templates-grid">
              ${this.templates.map(template => html`
                  <div 
                    class="template-item clickable"
                    @click=${() => this.onTemplateClick(template)}>
                  <div class="template-icon">${template.icon}</div>
                  <div class="template-name">${template.name}</div>
                  <div class="template-description">${template.description}</div>
                </div>
              `)}
            </div>
          </div>

          <!-- Node Types -->
          <div class="section">
            <div class="section-title">Approval Elements</div>
            <div class="node-types-list">
              ${['start', 'approver', 'condition', 'parallel', 'end'].map(nodeType => html`
                  <div 
                    class="node-type-item clickable"
                    @click=${() => this.onNodeTypeClick(nodeType)}>
                  <div class="node-type-icon">${this.getNodeTypeIcon(nodeType)}</div>
                  <div class="node-type-name">${this.getNodeTypeName(nodeType)}</div>
                </div>
              `)}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
