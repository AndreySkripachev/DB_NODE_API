import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { Manufacturer } from '../../core/dbModels/manufacturer.js';
import { manufacturerMapper } from '../../core/mappers/manufacturer.mapper.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';

app.get('/manufacturers', (_req, res) => {
  connection.query('SELECT * from manufacturer', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      (results as Manufacturer[]).map(manufacturerMapper.fromDB)
    );
  });
});
