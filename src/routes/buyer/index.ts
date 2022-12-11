import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { Buyer } from '../../core/dbModels/buyer.js';
import { buyerMapper } from '../../core/mappers/buyer.mapper.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';

const URL = '/buyer';

app.get(URL, (_req, res) => {
  connection.query('SELECT * from buyer', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      (results as Buyer[]).map(buyerMapper.fromDB)
    );
  });
});

app.get(`${URL}/:name/:address/:phone/:email`, (req, res) => {
  const {
    address,
    email,
    name,
    phone,
  } = req.params;

  connection.query(`
    INSERT INTO buyer (bName, bAddress, bPhone, bEmail)
    VALUES ('${name}', '${address}', '${email}', '${phone}');
  `, (error, results) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(results);
  })
});

app.get(`${URL}/delete/:id`, (req, res) => {
  const { id } = req.params;

  connection.query(`DELETE FROM buyer WHERE IDb=${id}`, (error, result) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(result);
  })
})

app.get(`${URL}/update/:id/:name/:address/:phone/:email`, (req, res) => {
  const {
    email,
    id,
    name,
    phone,
    address,
  } = req.params;

  connection.query(`
    UPDATE buyer
    SET bName='${name}', bAddress='${address}, bPhone='${phone}', bEmail='${email}'
    WHERE IDb=${id};
  `, (error, result) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(result);
  })
})
