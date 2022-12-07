import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { Manufacturer } from '../../core/dbModels/manufacturer.js';
import { manufacturerMapper } from '../../core/mappers/manufacturer.mapper.js';

app.get('/manufacturers', (_req, res) => {
  connection.query('SELECT * from manufacturer', (_error, results, _fields) => {
    res.send(
      (results as Manufacturer[]).map(manufacturerMapper.fromDB)
    );
  });
});
