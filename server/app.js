require("dotenv").config();
const express = require("express");
const cookiePraser = require("cookie-parser");
require("express-async-errors");
const path = require("path");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const app = express();
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
const reviewRouter = require("./routes/reviewRouter");
const utilsRouter = require("./routes/utlilRouter");
const userProfileRouter = require("./routes/usreProfileRouter");
const orderRouter = require("./routes/orderRouter");
const { errorHandlerMiddleware } = require("./middleewares/errorHandler");
const { notFound } = require("./middleewares/notFound");

const limit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// middlewares
app.use(express.json());

// basic security
app.use(helmet());
app.use(limit);
app.use(mongoSanitize());
//
app.use(express.static(path.join(__dirname, "./images")));
app.use(cookiePraser(process.env.JWT_SECRET));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }));

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/util", utilsRouter);
app.use("/api/v1/profile", userProfileRouter);
app.use("/api/v1/order", orderRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

module.exports = { app };
