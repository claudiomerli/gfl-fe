export interface SaveCustomerMonitorDto {
  id?: number;
  customerId: number;
  projectId: number;
  status: string;
  currentlyMonthStatus: string;
  lastWork: string;
}
