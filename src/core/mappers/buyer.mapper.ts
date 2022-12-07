import { Buyer } from '../dbModels/buyer.js';
import { BuyerDto } from '../dtos/buyer.dto.js';
import { MapperFromDB } from './mapper.js';

class BuyerMapper implements MapperFromDB<Buyer, BuyerDto> {

  public fromDB(data: Buyer): BuyerDto {
    return {
      address: data.bAddress,
      email: data.bEmail,
      id: data.IDb,
      name: data.bName,
      phone: data.bPhone,
    };
  }
}

export const buyerMapper = new BuyerMapper();
