export class PaginationDto {
  page = 0;
  pageSize = 10;
  sortDirection = "ASC";
  sortBy = "id";

  static build = (page: number, pageSize: number): PaginationDto => {
    return {...new PaginationDto(), page, pageSize}
  }

  static buildMaxValueOnePage = (): PaginationDto => {
    return {...new PaginationDto(), page: 0, pageSize: 0x7fffffff}
  }

}
