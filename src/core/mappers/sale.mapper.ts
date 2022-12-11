import { Sale } from "../dbModels/sale.js";
import { SaleDto } from "../dtos/sale.dto.js";
import { MapperFromDB } from "./mapper.js";

class SaleMapper implements MapperFromDB<readonly Sale[], SaleDto[]> {

  public fromDB(data: readonly Sale[]): SaleDto[] {
    const sales: SaleDto[] = [];

    for (const sale of data) {
      const currentSale = sales.find(item => item.id === sale.IDs);

      if (currentSale === undefined) {
        sales.push({
          id: sale.IDs,
          buyer: {
            email: sale.bEMail,
            name: sale.bName,
          },
          employee: {
            firstName: sale.eFirstName,
            lastName: sale.eLastName,
            patronymic: sale.ePatronymic,
          },
          paymentType: sale.ptName,
          saleItems: [{
            count: sale.siCount,
            productName: sale.gName,
            id: sale.IDsi,
            sale: sale.IDs
          }]
        })
      } else {
        currentSale.saleItems.push({
          count: sale.siCount,
          productName: sale.gName,
          id: sale.IDsi,
          sale: sale.IDs
        })
      }
    }

    return sales
  }
}

export const saleMapper = new SaleMapper();
