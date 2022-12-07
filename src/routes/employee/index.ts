import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { Employee } from '../../core/dbModels/employee.js';
import { employeeMapper } from '../../core/mappers/employee.mapper.js';

app.get('/employees', (_req, res) => {
  connection.query('SELECT * from employee', (_error, results, _fields) => {
    res.send(
      (results as Employee[]).map(employeeMapper.fromDB)
    );
  });
});
