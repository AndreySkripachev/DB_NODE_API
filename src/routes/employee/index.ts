import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { Employee } from '../../core/dbModels/employee.js';
import { employeeMapper } from '../../core/mappers/employee.mapper.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';

app.get('/employees', (_req, res) => {
  connection.query('SELECT * from employee', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      (results as Employee[]).map(employeeMapper.fromDB)
    );
  });
});
