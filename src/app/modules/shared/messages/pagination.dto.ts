export class PaginationDto {
  page = 0;
  pageSize = 10;
  sortDirection = "ASC";
  sortBy = '';

  static build = (page: number, pageSize: number): PaginationDto => {
    return {...new PaginationDto(), page, pageSize}
  }

  constructor(page?: number, pageSize?: number, sortDirection?: string, sortBy?: string) {
    if(page) { this.page = page }
    if(pageSize) { this.pageSize = pageSize }
    if(sortDirection) { this.sortDirection = sortDirection }
    if(sortBy) { this.sortBy = sortBy }
  }

  static buildMaxValueOnePage = (): PaginationDto => {
    return {...new PaginationDto(), page: 0, pageSize: 0x7fffffff}
  }

}
