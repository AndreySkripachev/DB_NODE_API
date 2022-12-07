import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';
import { PaymentType } from '../../core/dbModels/paymentType.js';
import { paymentTypeMapper } from '../../core/mappers/paymentType.mapper.js';

app.get('/payment-types', (_req, res) => {
  connection.query('SELECT * from payment_type', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      (results as PaymentType[]).map(paymentTypeMapper.fromDB)
    );
  });
});
