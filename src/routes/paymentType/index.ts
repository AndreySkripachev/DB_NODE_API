import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';
import { PaymentType } from '../../core/dbModels/paymentType.js';
import { paymentTypeMapper } from '../../core/mappers/paymentType.mapper.js';

const URL = '/payment-types';

//Get req
app.get(URL, (_req, res) => {
  connection.query('SELECT * from payment_type', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      (results as PaymentType[]).map(paymentTypeMapper.fromDB)
    );
  });
});

// Post req
app.get(`${URL}/:name`, (req, res) => {
  const { name } = req.params;

  connection.query(`
    INSERT INTO payment_type (ptName)
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

  connection.query(`DELETE FROM payment_type WHERE IDg=${id}`, (error, result) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(result);
  })
})
