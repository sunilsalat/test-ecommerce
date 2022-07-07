require("dotenv").config();
const express = require("express");
const cookiePraser = require("cookie-parser");
require("express-async-errors");
const path = require("path");
const fileUpload = require("express-fileupload");
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

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, './images')));
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
