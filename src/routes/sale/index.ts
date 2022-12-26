import app from '../../app/index.js';
import connection from '../../app/connection.js';
import { createMySQLErrorResponse } from '../../server/errorHandler.js';
import { Sale } from '../../core/dbModels/sale.js';
import { saleMapper } from '../../core/mappers/sale.mapper.js';

const URL = '/sales';

interface SaleBase {
  readonly IDs: number;
}

app.get(URL, (_req, res) => {
  connection.query('SELECT * from view_sales', (error, results) => {
    if (error) {
      res.status(Number(error.code)).send(createMySQLErrorResponse(error));
    }

    res.send(
      saleMapper.fromDB(results as Sale[])
    );
  });
});

app.get(`${URL}/delete/:id`, (req, res) => {
  const { id } = req.params;

  connection.query(
    `DELETE FROM sale_items WHERE IDs=${id}`,
  (error, response) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    connection.query(`DELETE FROM sales where IDs=${id}`);

    res.send(response);
  })
});

app.get(`${URL}/update/:id/:buyer/:employee/:payment/:date`, (req, res) => {
  const { buyer, date, employee, id, payment } = req.params;

  const dateToDB = date.split('.').reverse().join('-');
  connection.query(`
    UPDATE sales
    SET sDate='${dateToDB}', IDb=${buyer}, IDe=${employee}, IDpt=${payment}
    WHERE IDs=${id};
  `, (error, response) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(response);
  })
})

app.get(`${URL}/add/:buyer/:employee/:payment`, (req, res) => {
  const { buyer, employee, payment } = req.params;

  const date = new Date().toISOString().split('T')[0];
  connection.query(`
    INSERT INTO sales (sDate, IDe, IDpt, IDb)
    VALUES ('${date}', '${employee}', '${payment}', '${buyer}');
  `, (error, results) => {
    if (error) {
      console.log(JSON.stringify(error, null, 2))
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(results);

    connection.query(`SELECT * from sales`, (_error, result: readonly SaleBase[]) => {
      const maxId = Math.max(...result.map(({ IDs }) => IDs));

      connection.query(`
        INSERT INTO sale_items (IDg, siCount, IDs)
        VALUES (5, 0, ${maxId});
      `)
    })
  })
});

app.get(`${URL}/add_item/:product/:count/:sale`, (req, res) => {
  const { count, product, sale } = req.params;

  connection.query(`
    INSERT INTO sale_items (IDg, siCount, IDs)
    VALUES ('${product}', '${count}', '${sale}');
  `, (error, results) => {
    if (error) {
      console.log(JSON.stringify(error, null, 2))
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(results);
  })
});

app.get(`${URL}/remove_item/:id`, (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM sale_items WHERE IDsi=${id}`, (error, results) => {
    if (error) {
      console.log(JSON.stringify(error, null, 2))
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(results);
  });
});
