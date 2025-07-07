export interface SearchCommissionDashboardDto {
  projectId?: number;
  newspaperId?: number;
  customerId?: number;
  deliveryDateFrom?: string;
  deliveryDateTo?: string;
  includeArchived?: boolean
}
