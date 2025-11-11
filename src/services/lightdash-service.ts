// Lightdash Service - Mock implementation for POC
import { FinOpsMetrics, LightdashDashboard } from '../types';

export class LightdashService {
  private baseUrl = '/api/lightdash';
  
  /**
   * Get FinOps metrics dashboard data
   * In production, this would call Lightdash API
   */
  async getFinOpsMetrics(): Promise<FinOpsMetrics> {
    // Simulate network delay
    await this.delay(300);
    
    // Mock FinOps data - realistic for a FinOps BI Platform
    return {
      totalSpend: {
        current: 2300000, // $2.3M
        previous: 2100000, // $2.1M
        trend: 'up',
        percentageChange: 9.5
      },
      budget: {
        allocated: 2500000, // $2.5M
        spent: 2300000, // $2.3M
        remaining: 200000, // $200K
        variance: 200000, // $200K over
        variancePercentage: 8.0,
        daysUntilExhausted: 23
      },
      costByService: [
        { service: 'EC2 (Compute)', cost: 800000, percentage: 34.8, trend: 'up' },
        { service: 'S3 (Storage)', cost: 400000, percentage: 17.4, trend: 'up' },
        { service: 'RDS (Database)', cost: 300000, percentage: 13.0, trend: 'down' },
        { service: 'Lambda (Serverless)', cost: 250000, percentage: 10.9, trend: 'up' },
        { service: 'CloudFront (CDN)', cost: 200000, percentage: 8.7, trend: 'up' },
        { service: 'Other', cost: 350000, percentage: 15.2, trend: 'stable' }
      ],
      costByDepartment: [
        { department: 'Engineering', cost: 1200000, trend: 'up', percentage: 52.2 },
        { department: 'IT Operations', cost: 450000, trend: 'up', percentage: 19.6 },
        { department: 'Sales & Marketing', cost: 350000, trend: 'down', percentage: 15.2 },
        { department: 'Product', cost: 200000, trend: 'up', percentage: 8.7 },
        { department: 'Other', cost: 100000, trend: 'stable', percentage: 4.3 }
      ],
      costByCloudProvider: [
        { provider: 'AWS', cost: 1380000, percentage: 60.0 },
        { provider: 'Azure', cost: 690000, percentage: 30.0 },
        { provider: 'GCP', cost: 230000, percentage: 10.0 }
      ],
      anomalies: [
        {
          id: 'anom_1',
          type: 'cost_spike',
          severity: 'high',
          message: 'EC2 costs spiked 45% on Jan 15 - likely due to auto-scaling event',
          date: new Date('2025-01-15'),
          cost: 360000
        },
        {
          id: 'anom_2',
          type: 'storage_increase',
          severity: 'medium',
          message: 'S3 storage costs increased 30% this week',
          date: new Date('2025-01-20'),
          cost: 120000
        },
        {
          id: 'anom_3',
          type: 'budget_alert',
          severity: 'high',
          message: 'Budget will be exhausted in 23 days at current burn rate',
          date: new Date(),
          cost: 0
        }
      ],
      monthlyTrend: [
        { month: 'Jul 2024', cost: 1800000, budget: 2000000 },
        { month: 'Aug 2024', cost: 1900000, budget: 2000000 },
        { month: 'Sep 2024', cost: 1950000, budget: 2100000 },
        { month: 'Oct 2024', cost: 2000000, budget: 2200000 },
        { month: 'Nov 2024', cost: 2050000, budget: 2300000 },
        { month: 'Dec 2024', cost: 2100000, budget: 2400000 },
        { month: 'Jan 2025', cost: 2300000, budget: 2500000 }
      ]
    };
  }
  
  /**
   * Get Lightdash dashboard configuration
   * In production, this would fetch from Lightdash API
   */
  async getDashboard(dashboardId: string): Promise<LightdashDashboard> {
    await this.delay(200);
    
    const metrics = await this.getFinOpsMetrics();
    
    return {
      id: dashboardId,
      name: 'FinOps Overview Dashboard',
      description: 'Cloud cost analytics and budget tracking',
      embedUrl: `https://lightdash.example.com/embed/${dashboardId}`, // Mock embed URL
      metrics
    };
  }
  
  /**
   * Refresh metrics (simulate real-time update)
   */
  async refreshMetrics(): Promise<FinOpsMetrics> {
    await this.delay(500);
    return this.getFinOpsMetrics();
  }
  
  // Utility method to simulate network delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Global service instance
export const lightdashService = new LightdashService();

