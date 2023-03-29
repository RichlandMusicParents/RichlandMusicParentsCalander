const { response } = require("express");
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
	*,
	(SELECT 
	"user".first_name FROM "user" WHERE "user".id = "event".user_id ),
		(SELECT 
	"user".last_name FROM "user" WHERE "user".id = "event".user_id )
FROM
	"event"
ORDER BY "id" ASC;
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

router.get("/specific-user-events/:id", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const text = `
  SELECT
	*,
	(SELECT 
	"user".first_name FROM "user" WHERE "user".id = "event".user_id ),
		(SELECT 
	"user".last_name FROM "user" WHERE "user".id = "event".user_id ),
		(SELECT 
	"calendar".calendar_name FROM "calendar" WHERE "calendar".id = "event".calendar_id )
FROM
	"event"
WHERE "event"."user_id" = $1;
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
  const { event_type, event_date, event_name, user_id, calendar_id } = req.body;

  const text = `
  INSERT INTO "event" ("event_type", "event_date", "event_name", "user_id", "calendar_id")
	VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
    `;

  pool
    .query(text, [event_type, event_date, event_name, user_id, calendar_id])
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making SELECT for items:", error);
      res.sendStatus(500);
    });
});

router.put("/admin-edit-event/:id", rejectUnauthenticated, (req, res) => {
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
  if (req.isAuthenticated()) {
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

router.delete("/admin-delete-event/:id", (req, res) => {
  const text = `DELETE FROM "event" WHERE "id" = $1;`;
  if (req.isAuthenticated()) {
    pool
      .query(text, [req.params.id])
      .then((results) => res.sendStatus(204))
      .catch((err) => {
        console.log("Error making DELETE for events:", err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.post("/", (req, res) => {
  console.log("in Post Route for events", req.body);
  const { event_type, event_date, event_name, user_id, calendar_id } = req.body;

  const queryText = `INSERT INTO "event" ("event_type", "event_date", "event_name", "user_id", "calendar_id")
	VALUES ($1, $2, $3, $4, $5)
  RETURNING *;`;

  pool
    .query(queryText, [
      event_type,
      event_date,
      event_name,
      user_id,
      calendar_id,
    ])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error in post event", err);
      res.sendStatus(500);
    });
});

router.post("/user-add-events", (req, res) => {
  const { event_type, event_date, event_name, user_id, calendar_id } = req.body;

  const text = `
  INSERT INTO "event" ("event_type", "event_date", "event_name", "user_id", "calendar_id")
	VALUES ($1, $2, $3, $4, $5)
  RETURNING "id";
    `;
  if (req.isAuthenticated()) {
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

router.get("/user-events/:id", (req, res) => {
  console.log(req.user_id);
  const text = `
  SELECT * FROM "event" WHERE "user_id" = $1;
  `;
  pool
    .query(text, [req.params.id])
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making SELECT events for user:", error);
      res.sendStatus(500);
    });
});

//delete event for user
router.delete("/delete-events/:id", (req, res) => {
  const QUERYTEXT = `DELETE FROM "event" WHERE id = $1;`;
  pool
    .query(QUERYTEXT, [req.params.id])
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("error in deleting event", error);
    });
});

//Edit event for user
router.put("/user-edit-event/:id", (req, res) => {
  const { event_type, event_date, event_name, user_id, calendar_id } = req.body;
  const QUERYTEXT = `UPDATE "event" SET "event_type" = $1, "event_date" = $2,
  "event_name" = $3, "user_id" = $4, "calendar_id" = $5 WHERE "id" = $6;`;
  pool
    .query(QUERYTEXT, [
      event_type,
      event_date,
      event_name,
      user_id,
      calendar_id,
      req.params.id,
    ])
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("error in updating event", error);
    });
});

module.exports = router;
