import connection from "../../app/connection.js";
import app from "../../app/index.js";
import { createMySQLErrorResponse } from "../../server/errorHandler.js";

const URL = 'sale-items';

app.get(`${URL}/:product/:count/:sale`, (req, res) => {
    const {
        count,
        product,
        sale,
    } = req.params;

    connection.query(`
      INSERT INTO sale_items (IDsi, siCount, IDs)
      VALUES ('${product}', ${count}, ${sale});
    `, (error, results) => {
        if (error) {
            res.status(500).send(createMySQLErrorResponse(error));
        }

        res.send(results);
    });
})

app.get(`${URL}/delete/:id`, (req, res) => {
  const { id } = req.params;

  connection.query(`DELETE FROM sale_items WHERE IDsi=${id}`, (error, result) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(result);
  })
})

app.get(`${URL}/update/:id/:product/:count/:sale`, (req, res) => {
  const {
    id,
    count,
    product,
    sale,
  } = req.params;

  connection.query(`
    UPDATE sale_items
    SET IDg=${product}, siCount=${count}, IDs=${sale}
    WHERE IDsi=${id};
  `, (error, result) => {
    if (error) {
      res.status(500).send(createMySQLErrorResponse(error));
    }

    res.send(result);
  })
})
