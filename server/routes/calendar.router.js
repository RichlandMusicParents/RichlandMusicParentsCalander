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

  const { calendar_year } = req.body;

  const text = `
  INSERT INTO "calendar" ("calendar_year") 
  VALUES ($1);
            `;
  if (req.user.is_admin === true) {
    pool
      .query(text, [calendar_year])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making POST for calendar:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
