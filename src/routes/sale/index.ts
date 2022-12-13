import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';
import { Sale } from '../../core/dbModels/sale.js';
import { saleMapper } from '../../core/mappers/sale.mapper.js';

const URL = '/sales';

app.get(URL, (_req, res) => {
  connection.query('SELECT * from view_sales', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      saleMapper.fromDB(results as Sale[])
    );
  });
});

app.get(`${URL}/delete/:id`, (req, res) => {
  const { id } = req.params;

  connection.query(
    `DELETE FROM sale_items WHERE IDs=${id}`,
  (error, response) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    connection.query(`DELETE FROM sales where IDs=${id}`);

    res.send(response);
  })
});
