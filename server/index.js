const { app } = require("./app");
const { connectDb } = require("./utlis/connectDb");


const start = async () => {
  await connectDb(process.env.MONGO_URI)
    .then(() => console.log("connected to db.."))
    .catch((e) => console.log(e));

  app.listen(process.env.PORT, () => {
    console.log("server started...", process.env.PORT);
  });
};

start();
