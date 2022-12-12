import { ManufacturerDto } from "./manufacturer.dto.js";
import { ProductTypeDto } from "./productType.dto.js";

export interface ProductDto {
  readonly manufacturer: ManufacturerDto;
  readonly id: number;
  readonly name: string;
  readonly cost: number;
  readonly type: ProductTypeDto;
}
