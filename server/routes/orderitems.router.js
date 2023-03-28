const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");


router.get("/:id", rejectUnauthenticated, (req, res) => {
  const text = `SELECT
	*, 
	(SELECT 
	"product"."name" FROM "product" WHERE "product".id = "order_items"."product_id" )
FROM
	order_items
WHERE
	user_id = $1;
`;
  pool
    .query(text, [req.params.id])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.log("Error getting specific order items", err);
      res.sendStatus(500);
    });
});
router.post("/", (req, res) => {
  const queryText = `
    INSERT INTO order_items (quantity, price, product_id, order_id, user_id)
    VALUES ($1, $2, $3, $4, $5);`;

  const { quantity, price, product_id, order_id, user_id } = req.body;

  pool
    .query(queryText, [quantity, price, product_id, order_id, user_id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error in posting order_items", err);
      res.sendStatus(500);
    });
});


//Delete order-item by it's id.
router.delete("/delete-order-item/:id", rejectUnauthenticated, (req, res) => {
  const text = `DELETE FROM "order_items" WHERE "id" = $1;`;

  pool
    .query(text, [req.params.id])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("Error in DELETEing order item", err);
      res.sendStatus(500);
    });
});

//Edit order items by its id.
router.put("/edit-order-items/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "order_items" SET "quantity" = $1, "price" = $2, "product_id" = $3, "order_id" = $4, "user_id" = $5
	WHERE "id" = $6;`;

  const { quantity, price, product_id, order_id, user_id } = req.body;

  pool
    .query(queryText, [
      quantity,
      price,
      product_id,
      order_id,
      user_id,
      req.params.id,
    ])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error in editing order items", err);
      res.sendStatus(500);
    });
});
module.exports = router;
