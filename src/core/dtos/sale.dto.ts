import { BuyerDto } from "./buyer.dto.js";
import { EmployeeDto } from "./employee.dto.js";
import { SaleItemDto } from "./saleItem.dto.js";

export interface SaleDto {
  readonly id: number;
  readonly saleItems: SaleItemDto[];
  readonly employee: Omit<EmployeeDto, 'position'>;
  readonly buyer: Pick<BuyerDto, 'name' | 'email'>;
  readonly paymentType: string;
}
