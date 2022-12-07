import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { Product } from '../../core/dbModels/product.js';
import { productMapper } from '../../core/mappers/product.mapper.js';

app.get('/goods', (_req, res) => {
  connection.query('SELECT * from view_goods', (_error, results, _fields) => {
    res.send(
      (results as Product[]).map(productMapper.fromDB)
    );
  });
});
