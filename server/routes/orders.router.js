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
      "user".first_name,
      "user".last_name,
      "order_details"."address",
      "order_details"."city",
      "order_details"."state",
      "order_details"."zip",
      "order_details"."is_payed",
      "order_details"."payment_type",
      "order_details"."is_delivered",
      "order_details"."phone",
      "order_details"."total",
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

// Get route to get all orders by specific user

router.get("/specific-orders/:id", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const text = `
      SELECT
        "user".first_name,
        "user".last_name,
        "order_details"."address",
        "order_details"."city",
        "order_details"."state",
        "order_details"."zip",
        "order_details"."is_payed",
        "order_details"."payment_type",
        "order_details"."is_delivered",
        "order_details"."phone",
        "order_details"."total",
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

/**
 * POST route template
 */
router.post("/", (req, res) => {
  console.log("in Post Route", req.body);
  const queryText = `INSERT INTO order_details (address, city, state, zip, phone, total, payment_type, is_payed, is_delivered)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`

  pool
  .query(queryText, [
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.zip,
    req.body.phone,
    req.body.total,
    req.body.payment_type,
    req.body.is_payed,
    req.body.is_delivered
  ])
  .then((result) => {
    res.send(result.rows[0]);
  })
  .catch((err) => {
    console.error("Error in post stories", err);
    res.sendStatus(500);
  });

});


// router.post("/", (req, res) => {
//   console.log("in Post Route", req.body);

//   const queryText = `INSERT INTO "event`

// });

module.exports = router;
