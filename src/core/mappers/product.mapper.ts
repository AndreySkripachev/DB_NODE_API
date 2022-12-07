import { Product } from '../dbModels/product.js';
import { ProductDto } from '../dtos/product.dto.js';
import { MapperFromDB } from './mapper.js';

class ProductMapper implements MapperFromDB<Product, ProductDto> {
  public fromDB(data: Product): ProductDto {
    return {
      manufacturer: {
        country: data.mCountry,
        name: data.mName,
      },
      cost: data.gCost,
      id: data.IDg,
      name: data.gName,
      type: data.gtName,
    };
  }
};

export const productMapper = new ProductMapper();
