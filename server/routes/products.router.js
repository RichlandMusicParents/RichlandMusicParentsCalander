const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/all-products", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const text = `
  select "product".id, "product".calendar_id, "product".price, "product"."name", "calendar".calendar_name, "product"."sku"  from "product" join "calendar" on "calendar".id = product.calendar_id;
          `;
  if (req.user.is_admin === true) {
    pool
      .query(text)
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making SELECT for products:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

//GET route for user
router.get("/", (req, res) => {
  const queryText = 'SELECT * FROM "product"';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error getting product", error);
      res.sendStatus(500);
    });
});

router.post("/add-products", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const { name, price, sku, calendar_id } = req.body;

  const text = `
  INSERT INTO "product" ("name", "price", "sku", "calendar_id")
  VALUES ($1, $2, $3, $4);
      `;
  if (req.user.is_admin === true) {
    pool
      .query(text, [name, price, sku, calendar_id])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making POST for products:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.delete("/remove-products/:id", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const text = `
    DELETE FROM "product"
    WHERE "id" = $1;
        `;
  if (req.user.is_admin === true) {
    pool
      .query(text, [req.params.id])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making DELETE for products:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.put("/edit-products/:id", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const { name, price, sku, calendar_id } = req.body;

  const text = `
    UPDATE
	"product"
SET
	"name" = $1,
	"price" = $2,
	"sku" = $3,
	"calendar_id" = $4
WHERE "id" = $5;
          `;
  if (req.user.is_admin === true) {
    pool
      .query(text, [name, price, sku, calendar_id, req.params.id])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making PUT for products:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
