// Core Types for Approval Workflow Builder

export interface Position {
  x: number;
  y: number;
}

export interface ApprovalNode {
  id: string;
  type: 'start' | 'end' | 'approver' | 'condition' | 'parallel';
  name: string;
  position: Position;
  configuration: NodeConfiguration;
  approver?: Approver;
  condition?: Condition;
  createdAt: Date;
  updatedAt: Date;
}

export interface NodeConfiguration {
  approvalType?: 'single' | 'any' | 'all';
  timeout?: number;
  conditionType?: 'amount' | 'department' | 'custom';
  operator?: 'greaterThan' | 'lessThan' | 'equals';
  value?: string;
  parallelCount?: number;
}

export interface Approver {
  id: string;
  name: string;
  email: string;
  department?: string;
}

export interface Condition {
  type: 'amount' | 'department' | 'custom';
  operator: 'greaterThan' | 'lessThan' | 'equals';
  value: string;
  description: string;
}

export interface Connection {
  id: string;
  from: string;
  to: string;
  type: 'approval' | 'rejection' | 'timeout';
}

export interface ApprovalWorkflow {
  id: string;
  name: string;
  description: string;
  nodes: ApprovalNode[];
  connections: Connection[];
  createdAt: Date;
  updatedAt: Date;
  version: string;
}

export interface ValidationError {
  type: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  nodeId?: string;
  nodeIds?: string[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ApprovalRequest {
  id: string;
  workflowId: string;
  requester: string;
  data: Record<string, any>;
  status: 'pending' | 'approved' | 'rejected' | 'timeout';
  createdAt: Date;
}

export interface ExecutionResult {
  success: boolean;
  executionId: string;
  status: 'completed' | 'failed' | 'timeout';
  message?: string;
}

export interface ApprovalTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  nodes: Partial<ApprovalNode>[];
  connections: Partial<Connection>[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  department?: string;
  role?: string;
}
