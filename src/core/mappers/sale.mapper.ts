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
            id: sale.IDb,
          },
          employee: {
            firstName: sale.eFirstName,
            lastName: sale.eLastName,
            patronymic: sale.ePatronymic,
            id: sale.IDe,
          },
          paymentType: {
            id: sale.IDpt,
            name: sale.ptName,
          },
          saleItems: sale.IDg !== 5 ? [{
            count: sale.siCount,
            productName: sale.gName,
            id: sale.IDsi,
            cost: sale.gCost,
          }] : [],
          saleDate: sale.sDate,
        })
      } else if (sale.IDg !== 5) {
        currentSale.saleItems.push({
          count: sale.siCount,
          productName: sale.gName,
          id: sale.IDsi,
          cost: sale.gCost,
        })
      }
    }

    return sales
  }
}

export const saleMapper = new SaleMapper();
