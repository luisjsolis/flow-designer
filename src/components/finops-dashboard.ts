import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { FinOpsMetrics } from '../types';
import { lightdashService } from '../services/lightdash-service';

@customElement('finops-dashboard')
export class FinOpsDashboard extends LitElement {
  @state() private metrics: FinOpsMetrics | null = null;
  @state() private isLoading = true;
  @state() private error: string | null = null;
  @state() private lastUpdated: Date | null = null;

  static styles = css`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      overflow-y: auto;
      background: #f8f9fa;
    }

    .dashboard-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .dashboard-header h2 {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 600;
      color: #1f2937;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .refresh-btn {
      padding: 0.5rem 1rem;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background 0.2s;
    }

    .refresh-btn:hover {
      background: #2563eb;
    }

    .refresh-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .last-updated {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .metric-card {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
    }

    .metric-label {
      font-size: 0.875rem;
      color: #6b7280;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .metric-value {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.25rem;
    }

    .metric-change {
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .metric-change.up {
      color: #dc2626;
    }

    .metric-change.down {
      color: #16a34a;
    }

    .chart-section {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
    }

    .chart-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .cost-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .cost-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: #f9fafb;
      border-radius: 0.375rem;
    }

    .cost-item-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      color: #374151;
    }

    .cost-item-value {
      font-weight: 600;
      color: #1f2937;
    }

    .trend-indicator {
      font-size: 0.75rem;
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      font-weight: 500;
    }

    .trend-indicator.up {
      background: #fee2e2;
      color: #dc2626;
    }

    .trend-indicator.down {
      background: #dcfce7;
      color: #16a34a;
    }

    .anomalies-section {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
    }

    .anomaly-item {
      padding: 1rem;
      border-left: 4px solid;
      border-radius: 0.375rem;
      margin-bottom: 0.75rem;
      background: #f9fafb;
    }

    .anomaly-item.high {
      border-left-color: #dc2626;
    }

    .anomaly-item.medium {
      border-left-color: #f59e0b;
    }

    .anomaly-item.low {
      border-left-color: #3b82f6;
    }

    .anomaly-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .anomaly-severity {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
    }

    .anomaly-severity.high {
      background: #fee2e2;
      color: #dc2626;
    }

    .anomaly-severity.medium {
      background: #fef3c7;
      color: #d97706;
    }

    .anomaly-severity.low {
      background: #dbeafe;
      color: #2563eb;
    }

    .anomaly-message {
      color: #374151;
      font-size: 0.875rem;
    }

    .anomaly-date {
      color: #6b7280;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 400px;
      color: #6b7280;
    }

    .error {
      background: #fee2e2;
      color: #dc2626;
      padding: 1rem;
      border-radius: 0.5rem;
      margin: 2rem;
    }

    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    @media (max-width: 768px) {
      .two-column {
        grid-template-columns: 1fr;
      }
      
      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadMetrics();
  }

  private async loadMetrics() {
    this.isLoading = true;
    this.error = null;
    
    try {
      this.metrics = await lightdashService.getFinOpsMetrics();
      this.lastUpdated = new Date();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to load metrics';
    } finally {
      this.isLoading = false;
    }
  }

  private async handleRefresh() {
    await this.loadMetrics();
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  private formatNumber(value: number): string {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="loading">
          <div>Loading FinOps metrics...</div>
        </div>
      `;
    }

    if (this.error) {
      return html`
        <div class="error">
          <strong>Error:</strong> ${this.error}
        </div>
      `;
    }

    if (!this.metrics) {
      return html`<div>No metrics available</div>`;
    }

    const { totalSpend, budget, costByService, costByDepartment, costByCloudProvider, anomalies } = this.metrics;

    return html`
      <div class="dashboard-container">
        <div class="dashboard-header">
          <h2>📊 FinOps Dashboard</h2>
          <div class="header-actions">
            ${this.lastUpdated ? html`
              <span class="last-updated">
                Last updated: ${this.lastUpdated.toLocaleTimeString()}
              </span>
            ` : ''}
            <button 
              class="refresh-btn" 
              @click=${this.handleRefresh}
              ?disabled=${this.isLoading}
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        <!-- Key Metrics -->
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">Total Monthly Spend</div>
            <div class="metric-value">${this.formatCurrency(totalSpend.current)}</div>
            <div class="metric-change ${totalSpend.trend}">
              ${totalSpend.trend === 'up' ? '↑' : '↓'} 
              ${totalSpend.percentageChange.toFixed(1)}% vs last month
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-label">Budget Status</div>
            <div class="metric-value">${this.formatCurrency(budget.spent)} / ${this.formatCurrency(budget.allocated)}</div>
            <div class="metric-change ${budget.variance > 0 ? 'up' : 'down'}">
              ${budget.variance > 0 ? '↑' : '↓'} 
              ${Math.abs(budget.variancePercentage).toFixed(1)}% ${budget.variance > 0 ? 'over' : 'under'} budget
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-label">Budget Remaining</div>
            <div class="metric-value">${this.formatCurrency(budget.remaining)}</div>
            <div class="metric-change">
              ~${budget.daysUntilExhausted} days remaining
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-label">Top Cloud Provider</div>
            <div class="metric-value">${costByCloudProvider[0]?.provider || 'N/A'}</div>
            <div class="metric-change">
              ${costByCloudProvider[0] ? this.formatCurrency(costByCloudProvider[0].cost) : ''} 
              (${costByCloudProvider[0]?.percentage.toFixed(1)}%)
            </div>
          </div>
        </div>

        <!-- Cost Breakdowns -->
        <div class="two-column">
          <div class="chart-section">
            <div class="chart-title">Cost by Service</div>
            <div class="cost-list">
              ${costByService.map(item => html`
                <div class="cost-item">
                  <div class="cost-item-label">
                    ${item.service}
                    <span class="trend-indicator ${item.trend}">
                      ${item.trend === 'up' ? '↑' : '↓'}
                    </span>
                  </div>
                  <div class="cost-item-value">
                    ${this.formatCurrency(item.cost)} (${item.percentage.toFixed(1)}%)
                  </div>
                </div>
              `)}
            </div>
          </div>

          <div class="chart-section">
            <div class="chart-title">Cost by Department</div>
            <div class="cost-list">
              ${costByDepartment.map(item => html`
                <div class="cost-item">
                  <div class="cost-item-label">
                    ${item.department}
                    <span class="trend-indicator ${item.trend}">
                      ${item.trend === 'up' ? '↑' : '↓'}
                    </span>
                  </div>
                  <div class="cost-item-value">
                    ${this.formatCurrency(item.cost)} (${item.percentage.toFixed(1)}%)
                  </div>
                </div>
              `)}
            </div>
          </div>
        </div>

        <!-- Cloud Providers -->
        <div class="chart-section">
          <div class="chart-title">Cost by Cloud Provider</div>
          <div class="cost-list">
            ${costByCloudProvider.map(item => html`
              <div class="cost-item">
                <div class="cost-item-label">${item.provider}</div>
                <div class="cost-item-value">
                  ${this.formatCurrency(item.cost)} (${item.percentage.toFixed(1)}%)
                </div>
              </div>
            `)}
          </div>
        </div>

        <!-- Anomalies -->
        ${anomalies.length > 0 ? html`
          <div class="anomalies-section">
            <div class="chart-title">⚠️ Cost Anomalies & Alerts</div>
            ${anomalies.map(anomaly => html`
              <div class="anomaly-item ${anomaly.severity}">
                <div class="anomaly-header">
                  <span class="anomaly-severity ${anomaly.severity}">
                    ${anomaly.severity}
                  </span>
                  ${anomaly.cost > 0 ? html`
                    <span class="cost-item-value">${this.formatCurrency(anomaly.cost)}</span>
                  ` : ''}
                </div>
                <div class="anomaly-message">${anomaly.message}</div>
                <div class="anomaly-date">${this.formatDate(anomaly.date)}</div>
              </div>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }
}

