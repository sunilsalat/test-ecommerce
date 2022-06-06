const request = require("supertest");
const { app } = require("../../app");
const Product = require("../../models/product");

it("reutns 201 if product created successfully", async () => {
  const cookie = await global.signin();
  const res = await request(app)
    .post("/api/v1/product/create")
    .set("Cookie", cookie)
    .send({
      title: "new product",
      description: "new description",
      image: "sdlfkjsjf",
      unit: 5,
    })
    .expect(201);

  const product = await Product.findOne({ _id: res.body.product._id });

  expect(res.body.product._id.toString()).toEqual(product._id.toString());
  expect(res.body.product.title).toEqual(product.title);
});

it("reutns 200 if product edited successfully", async () => {
  const cookie = await global.signin();
  const res = await request(app)
    .post("/api/v1/product/create")
    .set("Cookie", cookie)
    .send({
      title: "new product",
      description: "new description",
      image: "sdlfkjsjf",
      unit: 5,
    })
    .expect(201);

  const id = res.body.product._id.toString();

  const restwo = await request(app)
    .put(`/api/v1/product/edit/${id}`)
    .set("Cookie", cookie)
    .send({
      title: "new product One",
      description: "new description",
      image: "sdlfkjsjf",
      unit: 6,
    })
    .expect(200);

  const product = await Product.findOne({ _id: restwo.body.product._id });

  expect(restwo.body.product.title).toEqual(product.title);
});
