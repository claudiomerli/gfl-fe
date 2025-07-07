export interface SearchProjectDto {
  globalSearch?: string | null;
  status?: string | null;
  projectCommissionStatus?: string[] | null;
  commissionYear?: number | null;
  commissionPeriod?: string | null;
  newspapers?: number[] | null;
  customerId?: number | null;
  includeArchived?: boolean | null;
}
