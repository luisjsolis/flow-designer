import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ApprovalWorkflow, ApprovalNode, Position } from '../types';
import { eventBus, EVENTS } from '../utils/event-bus';
import './connection-layer';

@customElement('approval-canvas')
export class ApprovalCanvas extends LitElement {
  @property({ type: Object }) workflow: ApprovalWorkflow | null = null;
  @property({ type: String }) selectedNodeId: string | null = null;
  @state() private canvasSize: { width: number; height: number } = { width: 800, height: 600 };
  @state() private viewportSize: { width: number; height: number } = { width: 800, height: 600 };

  static styles = css`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      position: relative;
    }

    .canvas {
      height: 100%;
      width: 100%;
      background: 
        radial-gradient(circle, #e5e7eb 1px, transparent 1px);
      background-size: 20px 20px;
      background-position: 0 0, 10px 10px;
      position: relative;
      overflow: auto;
      cursor: grab;
    }

    .canvas:active {
      cursor: grabbing;
    }


    .canvas-content {
      min-width: 100%;
      width: 100%;
      min-height: 100%;
      height: 100%;
      position: relative;
    }

    .nodes-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, 200px);
      gap: 30px;
      padding: 20px;
      align-content: start;
      justify-content: start;
    }

    .connections-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .drop-zone {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }

    .drop-zone.drag-over {
      background: rgba(59, 130, 246, 0.1);
      pointer-events: all;
    }

    .canvas-header {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: rgba(255, 255, 255, 0.95);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 5;
      border: 1px solid #e5e7eb;
    }

    .canvas-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
    }

    .canvas-header p {
      margin: 0.25rem 0 0 0;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .canvas-controls {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      gap: 0.5rem;
      z-index: 10;
    }

    .canvas-controls button {
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: rgba(255, 255, 255, 0.9);
      color: #374151;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    .canvas-controls button:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    .canvas-controls button.active {
      background: #3b82f6;
      color: #ffffff;
      border-color: #3b82f6;
    }
  `;

  private resizeObserver: ResizeObserver | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setupEventListeners();
    this.setupResizeObserver();
    this.addEventListener('node-move-up', this.onNodeMoveUp);
    this.addEventListener('node-move-down', this.onNodeMoveDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
    this.cleanupResizeObserver();
  }

  private setupEventListeners(): void {
    eventBus.on(EVENTS.NODE_ADDED, this.onNodeAdded.bind(this));
    eventBus.on(EVENTS.NODE_DELETED, this.onNodeDeleted.bind(this));
    eventBus.on(EVENTS.NODE_MOVED, this.onNodeMoved.bind(this));
    eventBus.on(EVENTS.WORKFLOW_UPDATED, this.onWorkflowUpdated.bind(this));
    eventBus.on('node-move-up', this.onNodeMoveUpEventBus.bind(this));
    eventBus.on('node-move-down', this.onNodeMoveDownEventBus.bind(this));
    eventBus.on('template-add', this.onTemplateAdd.bind(this));
    eventBus.on('node-type-add', this.onNodeTypeAdd.bind(this));
    // Listen for property changes to update the workflow
    this.addEventListener('property-changed', this.onPropertyChanged);
    eventBus.on('property-changed', this.onPropertyChangedEventBus);
  }

  private removeEventListeners(): void {
    eventBus.off(EVENTS.NODE_ADDED, this.onNodeAdded.bind(this));
    eventBus.off(EVENTS.NODE_DELETED, this.onNodeDeleted.bind(this));
    eventBus.off(EVENTS.NODE_MOVED, this.onNodeMoved.bind(this));
    eventBus.off(EVENTS.WORKFLOW_UPDATED, this.onWorkflowUpdated.bind(this));
    this.removeEventListener('property-changed', this.onPropertyChanged);
    eventBus.off('property-changed', this.onPropertyChangedEventBus);
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          this.updateCanvasSize(width, height);
        }
      });

      // Wait for the canvas element to be available
      this.updateComplete.then(() => {
        const canvas = this.shadowRoot?.querySelector('.canvas');
        if (canvas) {
          this.resizeObserver?.observe(canvas);
        }
      });
    }
  }

  private cleanupResizeObserver(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  private updateCanvasSize(width: number, height: number): void {
    this.canvasSize = { width, height };
    this.viewportSize = { 
      width: Math.max(800, width - 20), // Very generous width for wide screens
      height: Math.max(500, height - 80) 
    };
    
    console.log('Canvas resized:', { canvas: this.canvasSize, viewport: this.viewportSize });
    
    // Check if any nodes are outside the visible area and reposition if needed
    this.repositionNodesIfNeeded();
  }

  private repositionNodesIfNeeded(): void {
    if (!this.workflow) return;

    let needsRepositioning = false;
    const { width: maxWidth, height: maxHeight } = this.viewportSize;

    // Check if any nodes are outside the visible area
    for (const node of this.workflow.nodes) {
      if (node.position.x > maxWidth - 200 || node.position.y > maxHeight - 100) {
        needsRepositioning = true;
        break;
      }
    }

    if (needsRepositioning) {
      console.log('Repositioning nodes to fit within visible area');
      this.repositionAllNodes();
    }
  }

  private repositionAllNodes(): void {
    if (!this.workflow) return;

    const { width: maxWidth, height: maxHeight } = this.viewportSize;
    const gridSize = 180; // Reduced spacing for more compact layout
    const startX = 80;
    const startY = 80;

    this.workflow.nodes.forEach((node, index) => {
      const x = startX + (index * gridSize) % (maxWidth - 200);
      const y = startY + Math.floor((index * gridSize) / (maxWidth - 200)) * 80;
      
      node.position = {
        x: Math.min(x, maxWidth - 200),
        y: Math.min(y, maxHeight - 100)
      };
    });

    this.updateConnections();
    eventBus.emit(EVENTS.WORKFLOW_UPDATED, this.workflow);
    this.requestUpdate();
  }

  private onNodeAdded(node: ApprovalNode): void {
    if (this.workflow) {
      this.workflow.nodes.push(node);
      this.requestUpdate();
    }
  }

  private onNodeDeleted(nodeId: string): void {
    if (this.workflow) {
      this.workflow.nodes = this.workflow.nodes.filter(n => n.id !== nodeId);
      this.workflow.connections = this.workflow.connections.filter(
        c => c.from !== nodeId && c.to !== nodeId
      );
      this.requestUpdate();
    }
  }

  private onNodeMoved(data: { nodeId: string; position: Position }): void {
    if (this.workflow) {
      const node = this.workflow.nodes.find(n => n.id === data.nodeId);
      if (node) {
        node.position = data.position;
        node.updatedAt = new Date();
        this.requestUpdate();
      }
    }
  }

  private onWorkflowUpdated(workflow: ApprovalWorkflow): void {
    console.log('🔄 Workflow updated in canvas:', workflow.nodes.length, 'nodes');
    this.workflow = workflow;
    this.requestUpdate();
    
    // Force all nodes to recalculate their step numbers
    setTimeout(() => {
      this.updateAllStepNumbers();
    }, 100);
  }

  private updateAllStepNumbers(): void {
    const allNodes = this.shadowRoot?.querySelectorAll('approval-node');
    if (allNodes) {
      allNodes.forEach((node: any) => {
        if (node.forceStepNumberUpdate) {
          node.forceStepNumberUpdate();
        }
      });
    }
  }

  private onNodeMoveUp = (event: CustomEvent): void => {
    console.log('🔄 Canvas received move-up event:', event.detail);
    this.moveNode(event.detail.node, -1);
  }

  private onNodeMoveDown = (event: CustomEvent): void => {
    console.log('🔄 Canvas received move-down event:', event.detail);
    this.moveNode(event.detail.node, 1);
  }

  private onNodeMoveUpEventBus = (data: { node: ApprovalNode }): void => {
    console.log('🔄 Canvas received move-up event via event bus:', data);
    this.moveNode(data.node, -1);
  }

  private onNodeMoveDownEventBus = (data: { node: ApprovalNode }): void => {
    console.log('🔄 Canvas received move-down event via event bus:', data);
    this.moveNode(data.node, 1);
  }

  private onTemplateAdd = (data: { template: any }): void => {
    console.log('📋 Adding template to workflow:', data.template);
    // TODO: Implement template addition
  }

  private onNodeTypeAdd = (data: { nodeType: string }): void => {
    console.log('➕ Adding node type to workflow:', data.nodeType);
    this.addNode(data.nodeType, { x: 0, y: 0 });
  }

  private onPropertyChanged = (event: CustomEvent): void => {
    const { nodeId, path, value } = event.detail;
    this.updateWorkflowNodeProperty(nodeId, path, value);
  }

  private onPropertyChangedEventBus = (data: { nodeId: string; path: string; value: any }): void => {
    this.updateWorkflowNodeProperty(data.nodeId, data.path, data.value);
  }

  private updateWorkflowNodeProperty(nodeId: string, path: string, value: any): void {
    if (!this.workflow) return;

    const node = this.workflow.nodes.find(n => n.id === nodeId);
    if (!node) return;

    const keys = path.split('.');
    let current: any = node;
    
    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    // Set the new value
    current[keys[keys.length - 1]] = value;
    node.updatedAt = new Date();
    this.workflow.updatedAt = new Date();
    
    // Emit workflow updated event to notify other components
    eventBus.emit(EVENTS.WORKFLOW_UPDATED, this.workflow);
    
    console.log(`🔄 Workflow updated: Node ${node.name} - ${path} = ${value}`);
  }

  private moveNode(node: ApprovalNode, direction: number): void {
    if (!this.workflow) return;

    // Find the current index of the node in the workflow array
    const currentIndex = this.workflow.nodes.findIndex(n => n.id === node.id);
    
    console.log('🔄 Current node order:', this.workflow.nodes.map(n => n.name));
    console.log('🔄 Moving node:', node.name, 'from index:', currentIndex, 'direction:', direction);

    if (currentIndex === -1) {
      console.log('❌ Node not found in workflow');
      return;
    }

    const newIndex = currentIndex + direction;
    if (newIndex < 0 || newIndex >= this.workflow.nodes.length) {
      console.log('❌ Cannot move node - would be out of bounds');
      return;
    }

    // Remove the node from its current position
    const [movedNode] = this.workflow.nodes.splice(currentIndex, 1);
    
    // Insert it at the new position
    this.workflow.nodes.splice(newIndex, 0, movedNode);

    console.log('🔄 New node order:', this.workflow.nodes.map(n => n.name));

    // Update connections
    this.updateConnections();
    
    // Force a complete re-render
    this.workflow = { ...this.workflow };
    eventBus.emit(EVENTS.WORKFLOW_UPDATED, this.workflow);
    this.requestUpdate();
    
    // Force all nodes to recalculate step numbers after a short delay
    setTimeout(() => {
      this.updateAllStepNumbers();
    }, 50);
    
    console.log('✅ Node moved successfully');
  }

  private updateConnections(): void {
    if (!this.workflow) return;

    // Sort nodes by x position
    const sortedNodes = [...this.workflow.nodes].sort((a, b) => a.position.x - b.position.x);
    
    // Create new connections following the order
    this.workflow.connections = [];
    for (let i = 0; i < sortedNodes.length - 1; i++) {
      this.workflow.connections.push({
        id: `conn_${sortedNodes[i].id}_to_${sortedNodes[i + 1].id}`,
        from: sortedNodes[i].id,
        to: sortedNodes[i + 1].id,
        type: 'approval' as const
      });
    }

    console.log('🔄 Updated connections:', this.workflow.connections.length);
    
    // Force step number updates on all nodes
    this.updateStepNumbers();
  }

  private updateStepNumbers(): void {
    // Force all nodes to recalculate their step numbers
    const allNodes = this.shadowRoot?.querySelectorAll('approval-node');
    allNodes?.forEach(node => {
      (node as any).forceStepNumberUpdate();
    });
    console.log('🔢 Forced step number updates on all nodes');
  }

  private debugConnections(): void {
    if (!this.workflow) {
      console.log('❌ No workflow to debug');
      return;
    }

    console.log('🔗 === CONNECTION DEBUG ===');
    console.log('🔗 Total connections:', this.workflow.connections.length);
    
    this.workflow.connections.forEach((conn, index) => {
      const fromNode = this.workflow!.nodes.find(n => n.id === conn.from);
      const toNode = this.workflow!.nodes.find(n => n.id === conn.to);
      
      console.log(`🔗 Connection ${index + 1}:`, {
        id: conn.id,
        type: conn.type,
        from: fromNode ? `${fromNode.name} (${fromNode.position.x}, ${fromNode.position.y})` : 'NOT FOUND',
        to: toNode ? `${toNode.name} (${toNode.position.x}, ${toNode.position.y})` : 'NOT FOUND'
      });
    });
    
    console.log('🔗 === END CONNECTION DEBUG ===');
  }

  private debugEverything(): void {
    console.log('🐛 === COMPLETE DEBUG ===');
    console.log('🐛 Workflow exists:', !!this.workflow);
    if (this.workflow) {
      console.log('🐛 Nodes count:', this.workflow.nodes.length);
      console.log('🐛 Connections count:', this.workflow.connections.length);
      console.log('🐛 Canvas size:', this.shadowRoot?.querySelector('.canvas')?.getBoundingClientRect());
      console.log('🐛 Canvas content size:', this.shadowRoot?.querySelector('.canvas-content')?.getBoundingClientRect());
      console.log('🐛 Connection layer size:', this.shadowRoot?.querySelector('.connections-layer')?.getBoundingClientRect());
      console.log('🐛 All nodes:', this.workflow.nodes.map(n => `${n.name} at (${n.position.x}, ${n.position.y})`));
      console.log('🐛 All connections:', this.workflow.connections.map(c => `${c.from} → ${c.to}`));
    }
    console.log('🐛 === END COMPLETE DEBUG ===');
  }

  private onCanvasClick(event: MouseEvent): void {
    // Deselect all nodes when clicking on canvas
    if (event.target === this.shadowRoot?.querySelector('.canvas')) {
      eventBus.emit(EVENTS.NODE_SELECTED, null);
    }
  }


  private addNode(type: string, position: Position): void {
    if (!this.workflow) return;

    console.log(`Adding node of type: ${type}`);

    const node: ApprovalNode = {
      id: `node_${Date.now()}`,
      type: type as any,
      name: this.getDefaultNodeName(type),
      position: { x: 0, y: 0 }, // CSS Grid will handle positioning
      configuration: this.getDefaultConfiguration(type),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.workflow.nodes.push(node);
    eventBus.emit(EVENTS.NODE_ADDED, node);
    eventBus.emit(EVENTS.WORKFLOW_UPDATED, this.workflow);
    this.requestUpdate();
  }

  private getDefaultNodeName(type: string): string {
    const names = {
      'start': 'Start',
      'end': 'End',
      'approver': 'Approver',
      'condition': 'Condition',
      'parallel': 'Parallel Approvers'
    };
    return names[type as keyof typeof names] || 'Node';
  }

  private getDefaultConfiguration(type: string): any {
    const configs = {
      'approver': { approvalType: 'single', timeout: 7 },
      'condition': { conditionType: 'amount', operator: 'greaterThan' },
      'parallel': { approvalType: 'all', timeout: 7, parallelCount: 2 },
      'start': {},
      'end': {}
    };
    return configs[type as keyof typeof configs] || {};
  }

  private onZoomIn(): void {
    // TODO: Implement zoom functionality
    console.log('Zoom in');
  }

  private onZoomOut(): void {
    // TODO: Implement zoom functionality
    console.log('Zoom out');
  }

  private onFitToScreen(): void {
    // TODO: Implement fit to screen functionality
    console.log('Fit to screen');
  }

  private clearCanvas(): void {
    if (this.workflow) {
      this.workflow.nodes = [];
      this.workflow.connections = [];
      eventBus.emit(EVENTS.WORKFLOW_UPDATED, this.workflow);
      this.requestUpdate();
      console.log('Canvas cleared');
    }
  }

  private debugPositions(): void {
    if (this.workflow) {
      console.log('=== NODE POSITIONS DEBUG ===');
      this.workflow.nodes.forEach((node, index) => {
        console.log(`Node ${index + 1} (${node.type}): x=${node.position.x}, y=${node.position.y}`);
      });
      console.log('============================');
    }
  }

  private spreadNodes(): void {
    if (this.workflow) {
      const gridSize = 250;
      const startX = 150;
      const startY = 150;
      const maxWidth = 1200;
      
      this.workflow.nodes.forEach((node, index) => {
        node.position = {
          x: startX + (index * gridSize) % maxWidth,
          y: startY + Math.floor((index * gridSize) / maxWidth) * 120
        };
      });
      
      eventBus.emit(EVENTS.WORKFLOW_UPDATED, this.workflow);
      this.requestUpdate();
      console.log('Nodes spread out in grid pattern');
    }
  }

  private addTestNode(): void {
    // Add a test node at a specific position to verify positioning works
    const testPosition: Position = { x: 100, y: 300 };
    this.addNode('approver', testPosition);
    console.log('Added test node at position:', testPosition);
  }


  private autoArrange(): void {
    if (!this.workflow || this.workflow.nodes.length === 0) {
      console.log('❌ No workflow or nodes to arrange');
      return;
    }

    console.log('🔄 Auto-arranging', this.workflow.nodes.length, 'nodes');

    // Sort nodes by type priority (start first, end last)
    const typePriority = { 'start': 0, 'approver': 1, 'condition': 2, 'parallel': 3, 'end': 4 };
    const sortedNodes = [...this.workflow.nodes].sort((a, b) => {
      const aPriority = typePriority[a.type] ?? 5;
      const bPriority = typePriority[b.type] ?? 5;
      return aPriority - bPriority;
    });

    console.log('🔄 Sorted nodes by type:', sortedNodes.map(n => `${n.type}: ${n.name}`));

    // Arrange nodes using dynamic viewport size with improved spacing
    const { width: maxWidth, height: maxHeight } = this.viewportSize;
    const gridSize = 180; // Reduced spacing for more compact layout
    const startX = 80;
    const startY = 80;

    sortedNodes.forEach((node, index) => {
      const x = startX + (index * gridSize) % (maxWidth - 200);
      const y = startY + Math.floor((index * gridSize) / (maxWidth - 200)) * 80;
      
      const newPosition = {
        x: Math.min(x, maxWidth - 200),
        y: Math.min(y, maxHeight - 100)
      };
      console.log(`🔄 Moving ${node.name} from (${node.position.x}, ${node.position.y}) to (${newPosition.x}, ${newPosition.y})`);
      node.position = newPosition;
    });

    // Update connections to follow the new order
    this.workflow.connections = [];
    for (let i = 0; i < sortedNodes.length - 1; i++) {
      this.workflow.connections.push({
        from: sortedNodes[i].id,
        to: sortedNodes[i + 1].id
      });
    }

    console.log('🔄 Created', this.workflow.connections.length, 'connections');

    eventBus.emit(EVENTS.WORKFLOW_UPDATED, this.workflow);
    this.requestUpdate();
    console.log('✅ Auto-arranged nodes in logical workflow order');
  }

  render() {
    if (!this.workflow) {
      return html`
        <div class="canvas">
          <div class="canvas-header">
            <h3>No Workflow Loaded</h3>
            <p>Create a new workflow or load an existing one</p>
          </div>
        </div>
      `;
    }

    return html`
          <div class="canvas"
               @click=${this.onCanvasClick}>
        


        <!-- Drop Zone -->
        <div class="drop-zone"></div>

        <!-- Canvas Content -->
        <div class="canvas-content">
          <!-- Connections Layer - Temporarily disabled -->
          <!-- <div class="connections-layer">
            <connection-layer 
              .connections=${this.workflow.connections}
              .nodes=${this.workflow.nodes}>
            </connection-layer>
          </div> -->

          <!-- Nodes Container -->
          <div class="nodes-container">
            ${this.workflow.nodes.map(node => html`
              <approval-node 
                .node=${node}
                .isSelected=${node.id === this.selectedNodeId}
                @node-select=${() => eventBus.emit(EVENTS.NODE_SELECTED, node)}
                @node-edit=${() => eventBus.emit(EVENTS.NODE_EDITED, node)}
                @node-delete=${() => eventBus.emit(EVENTS.NODE_DELETED, node.id)}
                @node-move=${(e: CustomEvent) => eventBus.emit(EVENTS.NODE_MOVED, e.detail)}>
              </approval-node>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}
