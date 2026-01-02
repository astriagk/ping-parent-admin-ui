export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface UpdateApprovalStatusPayload {
  approval_status: ApprovalStatus;
  rejection_reason?: string;
}

export interface UpdateApprovalStatusResponse {
  success: boolean;
  data: null;
  message: string;
}

export interface UpdateApprovalStatusError {
  success: false;
  error: string;
}
