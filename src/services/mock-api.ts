// Mock ServiceNow API Service for Demo
import { ApprovalWorkflow, ApprovalNode, User, ValidationResult, ApprovalTemplate } from '../types';

export class MockServiceNowAPI {
  private baseUrl = '/api/servicenow';
  
  // Mock Flow APIs
  async getFlowDefinition(flowId: string): Promise<ApprovalWorkflow> {
    // Simulate network delay
    await this.delay(300);
    
    return {
      id: flowId,
      name: 'Sample Approval Flow',
      description: 'A sample approval workflow for demonstration',
      nodes: [
        {
          id: 'start_1',
          type: 'start',
          name: 'Start',
          position: { x: 100, y: 100 },
          configuration: {},
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'approver_1',
          type: 'approver',
          name: 'Manager Approval',
          position: { x: 300, y: 100 },
          configuration: {
            approvalType: 'single',
            timeout: 7
          },
          approver: {
            id: 'john_smith',
            name: 'John Smith',
            email: 'john@company.com'
          },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'end_1',
          type: 'end',
          name: 'Complete',
          position: { x: 500, y: 100 },
          configuration: {},
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      connections: [
        { id: 'conn_1', from: 'start_1', to: 'approver_1', type: 'approval' },
        { id: 'conn_2', from: 'approver_1', to: 'end_1', type: 'approval' }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0.0'
    };
  }
  
  async saveFlowDefinition(flow: ApprovalWorkflow): Promise<void> {
    // Simulate network delay
    await this.delay(500);
    
    console.log('💾 Saving flow:', flow.name);
    // In real implementation, this would save to ServiceNow
  }
  
  async validateFlow(flow: ApprovalWorkflow): Promise<ValidationResult> {
    // Simulate network delay
    await this.delay(200);
    
    const errors = [];
    
    // Check for required nodes
    if (!flow.nodes.some(n => n.type === 'start')) {
      errors.push({
        type: 'missing-start',
        message: 'Workflow must have a start node',
        severity: 'error' as const
      });
    }
    
    if (!flow.nodes.some(n => n.type === 'end')) {
      errors.push({
        type: 'missing-end',
        message: 'Workflow must have an end node',
        severity: 'error' as const
      });
    }
    
    // Check for approvers without assigned users
    const approverNodes = flow.nodes.filter(n => n.type === 'approver');
    approverNodes.forEach(node => {
      if (!node.approver) {
        errors.push({
          type: 'missing-approver',
          message: `Approver node "${node.name}" needs an assigned approver`,
          severity: 'error' as const,
          nodeId: node.id
        });
      }
    });
    
    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors
    };
  }
  
  // Mock User APIs
  async getUsers(): Promise<User[]> {
    // Simulate network delay
    await this.delay(200);
    
    return [
      { id: 'john_smith', name: 'John Smith', email: 'john@company.com', department: 'IT' },
      { id: 'sarah_johnson', name: 'Sarah Johnson', email: 'sarah@company.com', department: 'HR' },
      { id: 'mike_wilson', name: 'Mike Wilson', email: 'mike@company.com', department: 'Finance' },
      { id: 'lisa_brown', name: 'Lisa Brown', email: 'lisa@company.com', department: 'Operations' },
      { id: 'david_lee', name: 'David Lee', email: 'david@company.com', department: 'IT' }
    ];
  }
  
  // Mock Approval APIs
  async createApprovalWorkflow(workflow: ApprovalWorkflow): Promise<string> {
    // Simulate network delay
    await this.delay(800);
    
    const workflowId = `approval_workflow_${Date.now()}`;
    console.log('✅ Created approval workflow:', workflowId);
    return workflowId;
  }
  
  async executeApprovalWorkflow(workflowId: string, request: any): Promise<any> {
    // Simulate network delay
    await this.delay(1000);
    
    return {
      success: true,
      executionId: `exec_${Date.now()}`,
      status: 'completed'
    };
  }
  
  // Mock Templates
  async getApprovalTemplates(): Promise<ApprovalTemplate[]> {
    await this.delay(200);
    
    return [
      {
        id: 'simple-approval',
        name: 'Simple Approval',
        description: 'Single approver workflow',
        icon: '👤',
        nodes: [
          { type: 'start', name: 'Start' },
          { type: 'approver', name: 'Manager Approval' },
          { type: 'end', name: 'Complete' }
        ],
        connections: [
          { from: 'start', to: 'approver' },
          { from: 'approver', to: 'end' }
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
        ],
        connections: [
          { from: 'start', to: 'parallel' },
          { from: 'parallel', to: 'end' }
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
        ],
        connections: [
          { from: 'start', to: 'condition' },
          { from: 'condition', to: 'approver' },
          { from: 'approver', to: 'end' }
        ]
      }
    ];
  }
  
  // Utility method to simulate network delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Global API instance
export const mockAPI = new MockServiceNowAPI();
