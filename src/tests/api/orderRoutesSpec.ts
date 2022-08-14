import supertest from "supertest";
import { UserTypes } from "../../models/user";

import app from "../../server";

const request = supertest(app);

describe("Order API Routes", () => {
   let token: string = "";
   let loggedUser: UserTypes | null = null;
   beforeAll(async () => {
      const userData = {
         first_name: "Shorouk",
         last_name: "Alkalla",
         email: "shorouk@mail.com",
         password: "12345",
      };

      const response = await request.post("/users/register").send(userData);
      token = response.body.token;
      loggedUser = response.body.user;
   });

   it("Create Route", async () => {
      const response = await request
         .post("/orders")

         .set({
            Authorization: `Bearer ${token}`,
         })
         .send({});
      expect(response.body).toBeTruthy();
   });

   it("Index Route", async () => {
      const response = await request.get("/orders").set({
         Authorization: `Bearer ${token}`,
      });

      expect(response.body.orders.length).toBeGreaterThan(0);
   });
});
