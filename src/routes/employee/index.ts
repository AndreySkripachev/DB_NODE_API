import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { Employee } from '../../core/dbModels/employee.js';
import { employeeMapper } from '../../core/mappers/employee.mapper.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';

const URL = '/employees';

app.get(URL, (_req, res) => {
  connection.query('SELECT * from employee', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      (results as Employee[]).map(employeeMapper.fromDB)
    );
  });
});

app.get(`${URL}/:last/:first/:father/:position`, (req, res) => {
  const {
    father,
    first,
    last,
    position,
  } = req.params

  connection.query(`
    INSERT INTO employee (eLastName, eFirstName, ePatronymic, ePosition)
    VALUES ('${last}', '${first}', '${father}', '${position}');
  `, (error, results) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(results);
  })
})

app.get(`${URL}/delete/:id`, (req, res) => {
  const { id } = req.params;

  connection.query(`DELETE FROM employee WHERE IDe=${id}`, (error, result) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(result);
  })
})

app.get(`${URL}/update/:id/:last/:first/:father/:position`, (req, res) => {
  const {
    father,
    first,
    id,
    last,
    position,
  } = req.params;

  connection.query(`
    UPDATE employee
    SET eLastName='${last}', eFirstName='${first}, ePatronymic='${father}', ePosition='${position}'
    WHERE IDe=${id};
  `, (error, result) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(result);
  })
})

