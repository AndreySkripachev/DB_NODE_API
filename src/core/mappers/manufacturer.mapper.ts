import { Manufacturer } from '../dbModels/manufacturer.js';
import { ManufacturerDto } from '../dtos/manufacturer.dto.js';
import { MapperFromDB } from './mapper.js';

class ManufacturerMapper implements MapperFromDB<
  Manufacturer,
  ManufacturerDto
> {
  public fromDB(data: Manufacturer): ManufacturerDto {
    return {
      country: data.mCountry,
      id: data.IDm,
      name: data.mName,
    }
  }
}

export const manufacturerMapper = new ManufacturerMapper()
