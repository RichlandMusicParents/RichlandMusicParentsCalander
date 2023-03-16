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
	"order_details"."id",
	"order_details"."first_name",
	"order_details"."last_name",
	"order_details"."address",
	"order_details"."address",
	"order_details"."phone",
	"order_details"."total",
	"order_details"."is_payed",
	"order_details"."payment_type",
	"order_details"."is_delivered",
	json_agg(("order_items")) AS order_items
FROM
	"order_details"
	JOIN "user" ON "user".id = "user_id"
	JOIN "order_items" ON "order_id" = "order_details".id
GROUP BY
	"order_details"."id",
	"user".id;
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
  const queryText = `INSERT INTO "order_items" ("quantity", "product_id", "order_id")
	VALUES ($1, $2, $3);`;

  const { quantity, product_id, order_id } = req.body;

  pool
    .query(queryText, [quantity, product_id, order_id])
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
	"order_details"."id",
	"order_details"."first_name",
	"order_details"."last_name",
	"order_details"."address",
	"order_details"."address",
	"order_details"."phone",
	"order_details"."total",
	"order_details"."is_payed",
	"order_details"."payment_type",
	"order_details"."is_delivered",
	json_agg(("order_items")) AS order_items
FROM
	"order_details"
	JOIN "user" ON "user".id = "user_id"
	JOIN "order_items" ON "order_id" = "order_details".id
	WHERE "user"."id" = $1
GROUP BY
	"order_details"."id",
	"user".id;
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




router.get("/", (req, res) => {
  const queryText = `SELECT * FROM order_details`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error in GET all order details", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  console.log("in Post Route", req.body);

  const queryText = `INSERT INTO order_details ("first_name", "last_name", "total", "address", "city", "state", "zip", "phone", "payment_type", "user_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

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
    user_id,
  } = req.body;

  pool
    .query(queryText, [
      first_name,
      last_name,
      total,
      address,
      city,
      state,
      zip,
      phone,
      payment_type,
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


router.put("/edit-order", (req, res) => {
  console.log("in Post Route", req.body);
  const queryText = `UPDATE order_details 
  SET "total" = $1, "address" = $2, "city" = $3, "state" = $4, "zip" = $5, "phone" = $6, "payment_type" = $7, "user_id" = $8, "first_name" = $9, "last_name" = $10;
`;

  const {
    total,
    address,
    city,
    state,
    zip,
    phone,
    payment_type,
    user_id,
    first_name,
    last_name,
  } = req.body;

  pool
    .query(queryText, [
      total,
      address,
      city,
      state,
      zip,
      phone,
      payment_type,
      user_id,
      first_name,
      last_name,
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
