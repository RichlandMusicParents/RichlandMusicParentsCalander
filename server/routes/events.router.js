const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/all-events", rejectUnauthenticated, (req, res) => {
  // GET route code here
  // const { userID } = req.user;
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

router.get("/user-events/:id", rejectUnauthenticated, (req, res) => {
  // GET route code here
  // const { userID } = req.user;

  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const text = `
  SELECT
	*
FROM
	"event"
WHERE
	"user_id" = $1;
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
  // POST route code here
});

module.exports = router;
