import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { ProductType } from '../../core/dbModels/productType.js';
import { productTypeMapper } from '../../core/mappers/productType.mapper.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';

app.get('/goods-type', (_req, res) => {
  connection.query('SELECT * from goods_type', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      (results as ProductType[]).map(productTypeMapper.fromDB)
    );
  });
});
