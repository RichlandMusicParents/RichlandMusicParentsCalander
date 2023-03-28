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

router.get(
  "/specific-order-items-by-order/:id",
  rejectUnauthenticated,
  (req, res) => {
    const text = `SELECT
	SELECT
	*, 
	(SELECT 
	"product"."name" FROM "product" WHERE "product".id = "order_items"."product_id" )
FROM
	order_items
WHERE
	order_id = $1;
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
  }
);

router.get("/specific-order-items/:id", rejectUnauthenticated, (req, res) => {
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

router.post("/add-order-items", rejectUnauthenticated, (req, res) => {
  const queryText = `INSERT INTO "order_items" ("quantity", "price", "product_id", "order_id", "user_id")
	VALUES ($1, $2, $3, $4, $5);`;

  const { quantity, price, product_id, order_id, user_id } = req.body;

  pool
    .query(queryText, [quantity, price, product_id, order_id, user_id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error in posting order", err);
      res.sendStatus(500);
    });
});

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

router.get("/specific-orders/:id", rejectUnauthenticated, (req, res) => {
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

  pool
    .query(text, [req.params.id])
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making SELECT for items:", error);
      res.sendStatus(500);
    });
});

router.get("/new-order/:id", rejectUnauthenticated, (req, res) => {
  const text = `
  SELECT *
FROM "orders"
WHERE "user_id" = $1
ORDER BY "id" DESC
LIMIT 1;
`;

  pool
    .query(text, [req.params.id])
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making SELECT for items:", error);
      res.sendStatus(500);
    });
});

router.post("/add-order", (req, res) => {
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
      payment_type,
      email,
      total,
      is_payed,
      is_delivered,
      user_id,
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
