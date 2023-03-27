const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "order_items"; `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error getting order_items", error);
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

module.exports = router;
