import { ProductType } from '../dbModels/productType.js';
import { ProductTypeDto } from '../dtos/productType.dto.js';
import { MapperFromDB } from './mapper.js';

class ProductTypeMapper implements MapperFromDB<ProductType, ProductTypeDto> {

  public fromDB(data: ProductType): ProductTypeDto {
    return {
      id: data.IDgt,
      name: data.gtName,
    };
  }
}

export const productTypeMapper = new ProductTypeMapper();
