import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { Buyer } from '../../core/dbModels/buyer.js';
import { buyerMapper } from '../../core/mappers/buyer.mapper.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';

app.get('/buyers', (_req, res) => {
  connection.query('SELECT * from buyer', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      (results as Buyer[]).map(buyerMapper.fromDB)
    );
  });
});
