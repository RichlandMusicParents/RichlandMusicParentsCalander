const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/all-calendars", (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const text = `
      SELECT
        *
    FROM
        "calendar";
        `;
  if (req.user.is_admin === true) {
    pool
      .query(text)
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making GET for calendar:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * POST route template
 */
router.post("/add-calendar", (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const { calendar_name } = req.body;

  const text = `
  INSERT INTO "calendar" ("calendar_name") 
  VALUES ($1);
            `;
  if (req.user.is_admin === true) {
    pool
      .query(text, [calendar_name])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making POST for calendar:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.put("/edit-calendar/:id", (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const { calendar_name } = req.body;

  const text = `
  UPDATE "calendar"  
  SET "calendar_name" = $1
  WHERE "id" = $2;
            `;
  if (req.user.is_admin === true) {
    pool
      .query(text, [calendar_name, req.params.id])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making PUT for calendar:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.delete("/delete-calendar/:id", (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const text = `
DELETE FROM "calendar" 
  WHERE "id" = $1;
            `;
  if (req.user.is_admin === true) {
    pool
      .query(text, [req.params.id])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making POST for calendar:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.get("/", (req, res) => {
  const queryText = 'SELECT * FROM "calendar"';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error getting calendar", error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  const queryText = `INSERT INTO calendar (calendar_name)
  VALUES ($1) RETURNING * `;
  pool
    .query(queryText, [req.body.calendar_name])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log("Error adding calendar", error);
      res.sendStatus(500);
    });
});

module.exports = router;
