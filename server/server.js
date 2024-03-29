const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const eventsRouter = require("./routes/events.router");
const ordersRouter = require("./routes/orders.router");
const orderitemsRouter = require("./routes/orderitems.router");
const productsRouter = require("./routes/products.router");
const calendarRouter = require("./routes/calendar.router");
const googleRouter = require("./routes/googlesheets.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/events", eventsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/orderitems", orderitemsRouter);
app.use("/api/products", productsRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/google-sheets", googleRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
