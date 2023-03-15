const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route for an admin to see all events from all users
 */
router.get("/all-events", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const text = `
    SELECT
	*
    FROM
	"event";
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

// GET route for an admin to see all events from a specific user

router.get("/user-events/:id", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const text = `
  SELECT
	*
FROM
	"event"
WHERE
	"user_id" = $1
ORDER BY "id" ASC;
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
 * Post Route for an admin to add an event for a user
 */
router.post("/admin-add-event/", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const { event_type, event_date, event_name, user_id, calendar_id } = req.body;

  const text = `
  INSERT INTO "event" ("event_type", "event_date", "event_name", "user_id", "calendar_id")
	VALUES ($1, $2, $3, $4, $5)
  RETURNING "id";
    `;
  if (req.user.is_admin === true) {
    pool
      .query(text, [event_type, event_date, event_name, user_id, calendar_id])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making SELECT for items:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.put("/admin-edit-event/:id", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const { event_type, event_date, event_name, user_id, calendar_id } = req.body;

  const text = `
  UPDATE
	"event"
SET
	"event_type" = $1,
	"event_date" = $2,
	"event_name" = $3,
	"user_id" = $4,
	"calendar_id" = $5
WHERE 
  "id" = $6;
    `;
  if (req.user.is_admin === true) {
    pool
      .query(text, [
        event_type,
        event_date,
        event_name,
        user_id,
        calendar_id,
        req.params.id,
      ])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making SELECT for items:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
