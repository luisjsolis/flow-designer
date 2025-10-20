import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Connection, ApprovalNode } from '../types';

@customElement('connection-layer')
export class ConnectionLayer extends LitElement {
  @property({ type: Array }) connections: Connection[] = [];
  @property({ type: Array }) nodes: ApprovalNode[] = [];

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 1;
    }

    .connections-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .connection-line {
      position: absolute;
      height: 4px;
      background: #3b82f6;
      border-radius: 2px;
      z-index: 1;
    }

    .connection-line.approval {
      background: #10b981;
    }

    .connection-line.rejection {
      background: #ef4444;
    }

    .connection-line.timeout {
      background: #f59e0b;
    }

    .connection-line:hover {
      height: 6px;
    }
  `;

  private getNodePosition(nodeId: string): { x: number; y: number } | null {
    const node = this.nodes.find(n => n.id === nodeId);
    if (!node) return null;
    
    return {
      x: node.position.x + 100, // Center of node (200px width / 2)
      y: node.position.y + 40   // Center of node (80px height / 2)
    };
  }

  private getConnectionPath(connection: Connection): string {
    const fromPos = this.getNodePosition(connection.from);
    const toPos = this.getNodePosition(connection.to);
    
    console.log(`🔗 Calculating path for ${connection.from} → ${connection.to}:`, {
      fromPos,
      toPos,
      hasFrom: !!fromPos,
      hasTo: !!toPos
    });
    
    if (!fromPos || !toPos) {
      console.log(`❌ Missing position data for connection ${connection.id}`);
      return '';
    }

    // Calculate control points for smooth curve
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Control point offset (adjust for curve smoothness)
    const offset = Math.min(distance * 0.3, 100);
    
    const cp1x = fromPos.x + offset;
    const cp1y = fromPos.y;
    const cp2x = toPos.x - offset;
    const cp2y = toPos.y;

    const path = `M ${fromPos.x} ${fromPos.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${toPos.x} ${toPos.y}`;
    console.log(`🔗 Generated path: ${path}`);
    
    return path;
  }

  render() {
    console.log('🔗 ConnectionLayer render:', {
      connections: this.connections.length,
      nodes: this.nodes.length
    });
    
    // Add a simple test to see if this component is rendering at all
    console.log('🔗 ConnectionLayer component is rendering!');

        return html`
          <div class="connections-container">
            ${this.connections.map((connection, index) => {
              const fromPos = this.getNodePosition(connection.from);
              const toPos = this.getNodePosition(connection.to);
              
              console.log(`🔗 Connection ${index + 1}:`, {
                id: connection.id,
                from: connection.from,
                to: connection.to,
                fromPos,
                toPos
              });
              
              if (!fromPos || !toPos) return html``;
              
              const dx = toPos.x - fromPos.x;
              const dy = toPos.y - fromPos.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const angle = Math.atan2(dy, dx) * 180 / Math.PI;
              
              return html`
                <div 
                  class="connection-line ${connection.type}"
                  style="
                    left: ${fromPos.x}px;
                    top: ${fromPos.y}px;
                    width: ${distance}px;
                    transform: rotate(${angle}deg);
                    transform-origin: 0 0;
                  "
                  data-connection-id=${connection.id}
                  data-from=${connection.from}
                  data-to=${connection.to}>
                </div>
              `;
            })}
          </div>
        `;
  }
}
