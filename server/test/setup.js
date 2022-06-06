const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../app");

let mongo;

beforeAll(async () => {
  process.env.JWT_SECRET = "slkjdf";

  // creating in memory server and connecting..
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  // deleting all the data to save in-memory
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// closing db connection so jest can exit gracefully
afterAll(async () => {
  await mongo.stop();
  mongoose.connection.close();
});

global.signin = async () => {
  const name = "doe";
  const email = "doe@gmail.com";
  const password = "secret";

  await request(app)
    .post("/api/v1/auth/register")
    .send({ name, email, password })
    .expect(200);

  const res = await request(app)
    .post("/api/v1/auth/login")
    .set("user-agent", "test")
    .send({ email, password })
    .expect(200);

  const cookie = res.get("Set-Cookie");

  return cookie;
};
