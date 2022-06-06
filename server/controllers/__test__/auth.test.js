const request = require("supertest");
const { app } = require("../../app");

it("return ok if server running", async function () {
  const res = await request(app).get("/").expect(200);
});

// Register - Testing
it("return 500 if email|name|password is missing", async () => {
  const res = await request(app)
    .post("/api/v1/auth/register")
    .send({
      name: "doe",
      email: "doe@gmail.com",
    })
    .expect(500);
});

it("retun 500 if duplicate email provide", async () => {
  await request(app)
    .post("/api/v1/auth/register")
    .send({
      name: "doe",
      email: "doe@gmail.com",
      password: "secret",
    })
    .expect(200);

  await request(app)
    .post("/api/v1/auth/register")
    .send({
      name: "doe",
      email: "doe@gmail.com",
      password: "secret",
    })
    .expect(500);
});

// Login - Testing
it("return 500 if credential is worong", async () => {
  await request(app)
    .post("/api/v1/auth/register")
    .send({
      name: "doe",
      email: "doe@gmail.com",
      password: "secret",
    })
    .expect(200);

  await request(app)
    .post("/api/v1/auth/login")
    .send({
      email: "doe@gmail.com",
      password: "secfret",
    })
    .expect(500);
});

it("retuns cookie on successful signup", async () => {
  await request(app)
    .post("/api/v1/auth/register")
    .send({
      name: "doe",
      email: "doe@gmail.com",
      password: "secret",
    })
    .expect(200);

  const response = await request(app)
    .post("/api/v1/auth/login")
    .set("user-agent", "test")
    .send({
      email: "doe@gmail.com",
      password: "secret",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
