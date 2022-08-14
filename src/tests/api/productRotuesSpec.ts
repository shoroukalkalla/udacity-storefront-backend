import supertest from "supertest";

import app from "../../server";

const request = supertest(app);

describe("Product API Routes", () => {
   let token: string = "";

   beforeAll(async () => {
      const userData = {
         first_name: "Jenny",
         last_name: "William",
         email: "jenny@mail.com",
         password: "12345",
      };

      const response = await request.post("/users/register").send(userData);
      token = response.body.token;
   });

   it("Create Route", async () => {
      const response = await request
         .post("/products")

         .set({
            Authorization: `Bearer ${token}`,
         })
         .send({
            name: "product",
            price: 5,
         });
      expect(response.body).toBeTruthy();
   });

   it("Index Route", async () => {
      const response = await request.get("/products/");
      expect(response.body.length).toBeGreaterThan(0);
   });

   it("Show Route", async () => {
      const response = await request.get("/products/1");
      expect(response.body).toBeTruthy();
   });
});
