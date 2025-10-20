# ServiceNow API Reference for Visual Approval Workflow Builder

## Overview

This document outlines the ServiceNow APIs we need to implement the Visual Approval Workflow Builder. We have good coverage for core functionality, but we'll need to mock some APIs for the demo.

## ✅ Available APIs

### 1. Flow Designer APIs

#### **FlowAPI (Server-Side)**
```javascript
// Execute flows synchronously
var result = FlowAPI.executeFlow('flow_name', inputs);

// Execute flows asynchronously  
var executionId = FlowAPI.startFlow('flow_name', inputs);

// Execute subflows
var result = FlowAPI.executeSubflow('subflow_name', inputs);

// Execute actions
var result = FlowAPI.executeAction('action_name', inputs);
```

#### **GlideFlow (Client-Side)**
```javascript
// Client-side flow execution
GlideFlow.executeFlow('flow_name', inputs)
  .then(function(result) {
    // Handle result
  });

// Client-side subflow execution
GlideFlow.executeSubflow('subflow_name', inputs)
  .then(function(result) {
    // Handle result
  });
```

### 2. User Management APIs

#### **sys_user Table**
```javascript
// Get user information
var user = new GlideRecord('sys_user');
user.get('user_id');
var userName = user.getDisplayValue('name');
var userEmail = user.getValue('email');
```

#### **REST API for Users**
```javascript
// GET /api/now/table/sys_user
// Returns user list for approver selection
```

### 3. Approval Workflow APIs

#### **sysapproval_approver Table**
```javascript
// Create approval record
var approval = new GlideRecord('sysapproval_approver');
approval.initialize();
approval.setValue('source_table', 'incident');
approval.setValue('source_sys_id', incidentSysId);
approval.setValue('approver', approverSysId);
approval.setValue('state', 'requested');
approval.insert();
```

#### **REST API for Approvals**
```javascript
// GET /api/now/table/sysapproval_approver
// POST /api/now/table/sysapproval_approver
// PUT /api/now/table/sysapproval_approver/{sys_id}
```

## ❌ Missing APIs (Need to Mock)

### 1. Flow Definition APIs

#### **Flow Metadata**
```javascript
// We need these APIs but they may not exist:
// GET /api/now/flow/{flow_id}/definition
// POST /api/now/flow/definition
// PUT /api/now/flow/{flow_id}/definition
```

#### **Flow Validation**
```javascript
// We need these APIs but they may not exist:
// POST /api/now/flow/validate
// GET /api/now/flow/{flow_id}/validation
```

### 2. Approval Workflow Definition APIs

#### **Approval Workflow CRUD**
```javascript
// We need these APIs but they may not exist:
// GET /api/now/approval/workflow/{id}
// POST /api/now/approval/workflow
// PUT /api/now/approval/workflow/{id}
// DELETE /api/now/approval/workflow/{id}
```

## 🛠️ Implementation Strategy

### Phase 1: Mock APIs for Demo

For the interview demo, we'll create mock APIs that simulate the ServiceNow integration:

```typescript
// Mock ServiceNow API Service
export class MockServiceNowAPI {
  private baseUrl = '/api/servicenow';
  
  // Mock Flow APIs
  async getFlowDefinition(flowId: string): Promise<FlowDefinition> {
    // Return mock flow definition
    return {
      id: flowId,
      name: 'Sample Approval Flow',
      nodes: [],
      connections: []
    };
  }
  
  async saveFlowDefinition(flow: FlowDefinition): Promise<void> {
    // Mock save operation
    console.log('Saving flow:', flow);
  }
  
  async validateFlow(flow: FlowDefinition): Promise<ValidationResult> {
    // Mock validation
    return {
      isValid: true,
      errors: []
    };
  }
  
  // Mock User APIs
  async getUsers(): Promise<User[]> {
    return [
      { id: '1', name: 'John Smith', email: 'john@company.com' },
      { id: '2', name: 'Sarah Johnson', email: 'sarah@company.com' },
      { id: '3', name: 'Mike Wilson', email: 'mike@company.com' }
    ];
  }
  
  // Mock Approval APIs
  async createApprovalWorkflow(workflow: ApprovalWorkflow): Promise<string> {
    // Mock creation
    return 'approval_workflow_123';
  }
  
  async executeApprovalWorkflow(workflowId: string, request: ApprovalRequest): Promise<ExecutionResult> {
    // Mock execution
    return {
      success: true,
      executionId: 'exec_123',
      status: 'completed'
    };
  }
}
```

### Phase 2: Real ServiceNow Integration

For production implementation, we'll integrate with actual ServiceNow APIs:

```typescript
// Real ServiceNow API Service
export class ServiceNowAPI {
  private baseUrl: string;
  private authToken: string;
  
  constructor(baseUrl: string, authToken: string) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }
  
  async getFlowDefinition(flowId: string): Promise<FlowDefinition> {
    const response = await fetch(`${this.baseUrl}/api/now/flow/${flowId}/definition`, {
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.json();
  }
  
  async saveFlowDefinition(flow: FlowDefinition): Promise<void> {
    await fetch(`${this.baseUrl}/api/now/flow/definition`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(flow)
    });
  }
  
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/api/now/table/sys_user`, {
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    return data.result.map(user => ({
      id: user.sys_id,
      name: user.name,
      email: user.email
    }));
  }
  
  async createApprovalWorkflow(workflow: ApprovalWorkflow): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/now/approval/workflow`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workflow)
    });
    
    const result = await response.json();
    return result.result.sys_id;
  }
}
```

## 📋 API Requirements Checklist

### ✅ Available APIs
- [x] FlowAPI (server-side flow execution)
- [x] GlideFlow (client-side flow execution)
- [x] sys_user table access
- [x] sysapproval_approver table access
- [x] Basic REST API endpoints

### ❌ Missing APIs (Need to Mock)
- [ ] Flow definition CRUD operations
- [ ] Flow validation endpoints
- [ ] Approval workflow definition APIs
- [ ] Real-time flow execution monitoring
- [ ] Flow template management

## 🎯 Demo Strategy

### For the Interview Demo:

1. **Use Mock APIs** - Create realistic mock responses that simulate ServiceNow integration
2. **Show Real Integration Points** - Demonstrate where real APIs would be called
3. **Explain Production Implementation** - Discuss how to integrate with actual ServiceNow APIs
4. **Highlight API Coverage** - Show what's available vs. what needs to be built

### Mock API Examples:

```typescript
// Mock Flow Definition API
const mockFlowDefinition = {
  id: 'approval_flow_001',
  name: 'Purchase Request Approval',
  nodes: [
    {
      id: 'start_1',
      type: 'start',
      name: 'Start',
      position: { x: 100, y: 100 }
    },
    {
      id: 'approver_1',
      type: 'approver',
      name: 'Manager Approval',
      approver: 'john_smith',
      position: { x: 300, y: 100 }
    },
    {
      id: 'end_1',
      type: 'end',
      name: 'Complete',
      position: { x: 500, y: 100 }
    }
  ],
  connections: [
    { from: 'start_1', to: 'approver_1' },
    { from: 'approver_1', to: 'end_1' }
  ]
};

// Mock User API
const mockUsers = [
  { id: 'john_smith', name: 'John Smith', email: 'john@company.com' },
  { id: 'sarah_johnson', name: 'Sarah Johnson', email: 'sarah@company.com' },
  { id: 'mike_wilson', name: 'Mike Wilson', email: 'mike@company.com' }
];
```

## 💡 Interview Talking Points

### **API Strategy:**
"We have good coverage for core ServiceNow APIs like FlowAPI and user management. For the demo, I'm using mock APIs to simulate the integration, but I've designed the architecture to easily swap in real ServiceNow APIs for production."

### **Production Integration:**
"The real implementation would use ServiceNow's REST APIs and FlowAPI for execution. The mock APIs demonstrate the integration points and data flow without requiring a full ServiceNow instance."

### **Missing APIs:**
"Some APIs like flow definition CRUD operations may need to be built as custom ServiceNow applications, but the core execution and user management APIs are available."

## 🚀 Ready to Build

With this API strategy, we can:

1. **Build the full demo** using mock APIs
2. **Show real integration points** where ServiceNow APIs would be called
3. **Demonstrate production readiness** with proper API architecture
4. **Handle missing APIs gracefully** with clear implementation path

**Should we start building the ApprovalCanvas component with these mock APIs?**
