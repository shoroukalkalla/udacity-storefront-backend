import supertest from "supertest";
import { UserTypes } from "../../models/user";

import app from "../../server";

const request = supertest(app);

describe("Order API Routes", () => {
   let token: string = "";
   let loggedUser: UserTypes | null = null;
   let order_id: string = "";
   let product_id: string = "";

   beforeAll(async () => {
      const userData = {
         first_name: "Shorouk",
         last_name: "Alkalla",
         email: "shorouk2@mail.com",
         password: "12345",
      };

      const response = await request.post("/users/register").send(userData);
      token = response.body.token;
      loggedUser = response.body.user;

      const productResponse = await request
         .post("/products")

         .set({
            Authorization: `Bearer ${token}`,
         })
         .send({
            name: "product",
            price: 5,
         });

      const orderResponse = await request
         .post("/orders")

         .set({
            Authorization: `Bearer ${token}`,
         })
         .send({});

      product_id = productResponse.body.id;
      order_id = orderResponse.body.id;
   });

   it("Create Route", async () => {
      const response = await request
         .post("/order-products")

         .set({
            Authorization: `Bearer ${token}`,
         })
         .send({ order_id, product_id, quantity: 2 });
      expect(response.body).toBeTruthy();
   });

   it("Show Route", async () => {
      const response = await request
         .get("/order-products/1")
         .set({ Authorization: `Bearer ${token}` });

      expect(response.body).toBeTruthy();
   });
});
