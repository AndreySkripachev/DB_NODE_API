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
      (results as Product[]).map(productMapper.fromDB).filter(({ id }) => id !== 5)
    );
  });
});

app.get(`${URL}/:name/:cost/:type/:manufacturer`, (req, res) => {
  const {
    name,
    cost,
    manufacturer,
    type
  } = req.params;

  connection.query(`
    INSERT INTO goods (gName, gCost, IDgt, IDm)
    VALUES ('${name}', '${cost}', ${type}, ${manufacturer});
  `, (error, results) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(results);
  })
});

app.get(`${URL}/delete/:id`, (req, res) => {
  const { id } = req.params;

  connection.query(`DELETE FROM goods WHERE IDg=${id}`, (error, result) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(result);
  })
})

app.get(`${URL}/update/:id/:name/:cost/:type/:manufacturer`, (req, res) => {
  const {
    cost,
    id,
    manufacturer,
    name,
    type,
  } = req.params;

  connection.query(`
    UPDATE goods
    SET gName='${name}', gCost=${cost}, IDgt=${type}, IDm=${manufacturer}
    WHERE IDg=${id};
  `, (error, result) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(result);
  })
})
