export class User {
  id: number | undefined;
  username: string | undefined;
  fullname: string | undefined;
  email: string | undefined;
  mobilePhone: string | undefined;
  averageScore: string | undefined;
  level: string | undefined;
  remuneration: string | undefined;
  role: string | undefined;
  editorInfo: {
    info: string | undefined,
    remuneration: string | undefined;
    notes: string | undefined;
  } | undefined
  customerInfo?: CustomerInfo
  finalCustomers?: User[];
}

export interface CustomerInfo {
  companyName: string;
  url: string;
  companyDimension: string;
  businessArea: string;
  address: string;
  competitor1: string;
  competitor2: string;
  isAgency: boolean;
  piva: string;
  logo: string
}
