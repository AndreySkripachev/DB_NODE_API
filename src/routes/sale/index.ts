import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';
import { Sale } from '../../core/dbModels/sale.js';
import { saleMapper } from '../../core/mappers/sale.mapper.js';

app.get('/sales', (_req, res) => {
  connection.query('SELECT * from view_sales', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      saleMapper.fromDB(results as Sale[])
    );
  });
});