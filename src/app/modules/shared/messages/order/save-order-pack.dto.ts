export interface SaveOrderPackDto {
  name?: string;
  description?: string;
  price?: number;
  elements: SaveOrderPackElementDto[]
}

export interface SaveOrderPackElementDto {
  newspaperId: number;
  contentNumber: number;
}
