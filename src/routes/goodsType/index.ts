import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { ProductType } from '../../core/dbModels/productType.js';
import { productTypeMapper } from '../../core/mappers/productType.mapper.js';

app.get('/goods-type', (_req, res) => {
  connection.query('SELECT * from goods_type', (_error, results, _fields) => {
    res.send(
      (results as ProductType[]).map(productTypeMapper.fromDB)
    );
  });
});
