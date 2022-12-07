import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { Product } from '../../core/dbModels/product.js';
import { productMapper } from '../../core/mappers/product.mapper.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';

app.get('/goods', (_req, res) => {
  connection.query('SELECT * from view_goods', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      (results as Product[]).map(productMapper.fromDB)
    );
  });
});
