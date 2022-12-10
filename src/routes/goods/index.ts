import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { Product } from '../../core/dbModels/product.js';
import { productMapper } from '../../core/mappers/product.mapper.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';

const URL = '/goods';

app.get(URL, (_req, res) => {
  connection.query('SELECT * from view_goods', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      (results as Product[]).map(productMapper.fromDB)
    );
  });
});

app.get(`${URL}/:name/:cost`, (req, res) => {
  const name = req.params.name;
  const cost = req.params.cost;

  connection.query(`
    INSERT INTO goods (gName, gCost, IDgt, IDm)
    VALUES ('${name}', '${cost}', 1, 1);
  `, (error, results) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(results);
  })
})
