import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { Manufacturer } from '../../core/dbModels/manufacturer.js';
import { manufacturerMapper } from '../../core/mappers/manufacturer.mapper.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';

const URL = '/manufacturers';

app.get(URL, (_req, res) => {
  connection.query('SELECT * from manufacturer', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      (results as Manufacturer[]).map(manufacturerMapper.fromDB)
    );
  });
});

app.get(`${URL}/:name/:country`, (req, res) => {
  const { name, country } = req.params;

  connection.query(`
    INSERT INTO manufacturer (mName, mCountry)
    VALUES ('${name}', '${country}');
  `, (error, results) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(results);
  });
})
