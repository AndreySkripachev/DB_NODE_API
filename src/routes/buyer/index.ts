import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { Buyer } from '../../core/dbModels/buyer.js';
import { buyerMapper } from '../../core/mappers/buyer.mapper.js';

app.get('/buyers', (_req, res) => {
  connection.query('SELECT * from buyer', (_error, results, _fields) => {
    res.send(
      (results as Buyer[]).map(buyerMapper.fromDB)
    );
  });
});
