const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get("/specific/:id", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const text = `
    SELECT
	*
    FROM
	"user"
  WHERE "id" = $1
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

router.get("/all-users", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const text = `
    SELECT
	*
    FROM
	"user";
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

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const { username, first_name, last_name, is_admin } = req.body;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" ("username", "password", "first_name", "last_name")
	VALUES ($1, $2, $3, $4);`;
  pool
    .query(queryText, [username, password, first_name, last_name])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

router.post("/admin-register", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const { username, first_name, last_name, is_admin } = req.body;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" ("username", "password", "first_name", "last_name", "is_admin")
	VALUES ($1, $2, $3, $4, $5);`;
  if (req.user.is_admin === true) {
    pool
      .query(queryText, [username, password, first_name, last_name, is_admin])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log("Admin registration failed: ", err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put("/update-user/:id", rejectUnauthenticated, (req, res) => {
  if (!req.user.is_admin) {
    return res.sendStatus(401);
  }

  const { username, password, first_name, last_name, is_admin } = req.body;

  const text = `
    UPDATE
	"user"
SET
"username" = $1, $2, $3, $4, $5 
WHERE "id" = $6
          `;
  if (req.user.is_admin === true) {
    pool
      .query(text, [
        username,
        password,
        first_name,
        last_name,
        is_admin,
        req.params.id,
      ])
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log("Error making PUT for users:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.put("/admin-update-user/:id", rejectUnauthenticated, (req, res) => {
  const text = `
  UPDATE "user" 
  SET "is_admin" = $1
  WHERE "id"  = $2
  `;

  pool
    .query(text, [req.body.is_admin, req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in updating user admin privileges", err);
    });
});

module.exports = router;
