export interface SaveOrderDto {
  note?: string | null
  name?: string;
  elements: SaveOrderElementDto[]
}

export interface SaveOrderElementDto {
  newspaperId: number;
  contentNumber: number;
}
