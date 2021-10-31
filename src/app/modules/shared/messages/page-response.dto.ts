export class PageResponseDto<T> {

  content: T[] = [];

  pageable: {
    pageNumber: number,
    pageSize: number,
  } | undefined;

  totalElements: number | undefined;

}
