import { BuyerDto } from "./buyer.dto.js";
import { EmployeeDto } from "./employee.dto.js";
import { SaleItemDto } from "./saleItem.dto.js";

export interface SaleDto {
  readonly id: number;
  readonly saleItems: Omit<SaleItemDto, 'id'>[];
  readonly employee: Omit<EmployeeDto, 'position' | 'id'>;
  readonly buyer: Pick<BuyerDto, 'name' | 'email'>;
  readonly paymentType: string;
}
