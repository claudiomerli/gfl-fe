export interface SaveOrderDto {
  note?: string | null
  elements: SaveOrderElementDto[]
}

export interface SaveOrderElementDto {
  newspaperId: number;
  contentNumber: number;
}
