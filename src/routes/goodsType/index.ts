import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { ProductType } from '../../core/dbModels/productType.js';
import { productTypeMapper } from '../../core/mappers/productType.mapper.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';

const URL = '/goods-type';

app.get(URL, (_req, res) => {
  connection.query('SELECT * from goods_type', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      (results as ProductType[]).map(productTypeMapper.fromDB)
    );
  });
});

app.get(`${URL}/:name`, (req, res) => {
  const { name } = req.params;

  connection.query(`
    INSERT INTO goods_type (gtName)
    VALUES ('${name}');
  `, (error, results) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(results);
  });
})

app.get(`${URL}/delete/:id`, (req, res) => {
  const { id } = req.params;

  connection.query(`DELETE FROM goods_type WHERE IDg=${id}`, (error, result) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(result);
  })
})
