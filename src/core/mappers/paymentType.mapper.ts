import { PaymentType } from '../dbModels/paymentType.js';
import { PaymentTypeDto } from '../dtos/paymentType.dto.js';
import { MapperFromDB } from './mapper.js';

class PaymentTypeMapper implements MapperFromDB<PaymentType, PaymentTypeDto> {

  public fromDB(data: PaymentType): PaymentTypeDto {
    return {
      id: data.IDpt,
      name: data.ptName,
    };
  }
}

export const paymentTypeMapper = new PaymentTypeMapper();
