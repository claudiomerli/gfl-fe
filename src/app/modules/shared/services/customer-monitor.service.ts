import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../messages/auth/user";
import {environment} from "../../../../environments/environment";
import {CustomerMonitor} from "../messages/customer-monitor/customer-monitor";
import {SaveCustomerMonitorDto} from "../messages/customer-monitor/save-customer-monitor.dto";

@Injectable({
  providedIn: 'root'
})
export class CustomerMonitorService {

  constructor(private httpClient: HttpClient) {
  }

  public findCustomerMonitorByCustomer(customer: User) {
    return this.findCustomerMonitorByCustomerId(customer.id!)
  }

  public findCustomerMonitorByCustomerId(customerId: number) {
    return this.httpClient.get<CustomerMonitor[]>(environment.apiBaseurl + `/customer-monitor/${customerId}`)
  }

  public saveCustomerMonitor(saveMonitorStatus: SaveCustomerMonitorDto) {
    return this.httpClient.post<CustomerMonitor>(environment.apiBaseurl + `/customer-monitor`, saveMonitorStatus)
  }

  public deleteCustomerMonitor(id: number) {
    return this.httpClient.delete<void>(environment.apiBaseurl + `/customer-monitor/${id}`)
  }

}
