const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Get route to get all orders from all users

router.get("/all-orders", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const text = `
  SELECT
	*,
	(
		SELECT
			json_agg("event".*) AS "order_events"
		FROM
			"event"
		WHERE
			"event".user_id = "orders".user_id), (
		SELECT
			json_agg("order_items".*) AS "order_items"
		FROM
			"order_items"
		WHERE
			"order_items".order_id = "orders".id)
FROM
	"orders";
      `;
  if (req.user.is_admin === true) {
    pool
      .query(text)
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making SELECT for items:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.post("/add-order-items", rejectUnauthenticated, (req, res) => {
  const queryText = `INSERT INTO "order_items" ("quantity", "price", "product_id", "order_id")
	VALUES ($1, $2, $3, $4);`;

  const { quantity, price, product_id, order_id } = req.body;

  pool
    .query(queryText, [quantity, price, product_id, order_id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error in posting order", err);
      res.sendStatus(500);
    });
});
// Get route to get all orders by specific user

router.get("/specific-orders/:id", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const text = `
  SELECT
	*,
	(
		SELECT
			json_agg("event".*) AS "order_events"
		FROM
			"event"
		WHERE
			"event".user_id = "orders".user_id), (
		SELECT
			json_agg("order_items".*) AS "order_items"
		FROM
			"order_items"
		WHERE
			"order_items".order_id = "orders".id)
FROM
	"orders"
WHERE "orders"."user_id" = $1;
        `;
  if (req.user.is_admin === true) {
    pool
      .query(text, [req.params.id])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making SELECT for items:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.post("/", (req, res) => {
  console.log("in Post Route", req.body);
  const userId = req.user.id;

  const queryText = `INSERT INTO orders (
   first_name, last_name, address, city, state, zip, phone, payment_type, email, total,  is_payed, is_delivered, user_id
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
);`;

  const {
    first_name,
    last_name,
    total,
    address,
    city,
    state,
    zip,
    phone,
    payment_type,
    email,
    is_payed,
    is_delivered,
  } = req.body;

  pool
    .query(queryText, [
      first_name,
      last_name,
      address,
      city,
      state,
      zip,
      phone,
      payment_type,
      email,
      total,
      is_payed,
      is_delivered,
      userId,
    ])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error in posting order", err);
      res.sendStatus(500);
    });
});

router.put("/edit-order/:id", (req, res) => {
  console.log("in Post Route", req.body);
  const queryText = `UPDATE
	orders
SET
	first_name = $1,
	last_name = $2,
	address = $3,
	city = $4,
	state = $5,
	zip = $6,
	phone = $7,
	email = $8,
	total = $9,
	payment_type = $10,
	is_payed = $11,
	is_delivered = $12,
	user_id = $13
WHERE
	id = $14;
`;

  const {
    first_name,
    last_name,
    address,
    city,
    state,
    zip,
    phone,
    email,
    total,
    payment_type,
    is_payed,
    is_delivered,
    user_id,
  } = req.body;

  pool
    .query(queryText, [
      first_name,
      last_name,
      address,
      city,
      state,
      zip,
      phone,
      email,
      total,
      payment_type,
      is_payed,
      is_delivered,
      user_id,
      req.params.id,
    ])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error in editing orders", err);
      res.sendStatus(500);
    });
});

module.exports = router;
