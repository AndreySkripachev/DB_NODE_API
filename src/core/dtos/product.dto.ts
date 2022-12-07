import { ManufacturerDto } from "./manufacturer.dto.js";

export interface ProductDto {
  readonly manufacturer: Omit<ManufacturerDto, 'id'>;
  readonly id: number;
  readonly name: string;
  readonly cost: number;
  readonly type: string;
}
