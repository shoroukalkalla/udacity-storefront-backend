import supertest from "supertest";

import app from "../../server";

const request = supertest(app);

describe("user API Routes", () => {
   let token: string = "";
   it("Register  Route", async () => {
      const userData = {
         first_name: "Alice",
         last_name: "Watson",
         email: "alice2@mail.com",
         password: "12345",
      };

      const response = await request.post("/users/register").send(userData);
      expect(response.body).toBeTruthy();
   });

   it("Login Route", async () => {
      const response = await request.post("/users/login").send({
         email: "alice2@mail.com",
         password: "12345",
      });
      token = response.body.token;
      expect(response.body).toBeTruthy();
   });

   it("Index Route", async () => {
      const response = await request.get("/users").set({
         Authorization: `Bearer ${token}`,
      });
      expect(response.body.length).toBeGreaterThan(0);
   });

   it("Show Route", async () => {
      const response = await request.get("/users/1").set({
         Authorization: `Bearer ${token}`,
      });
      expect(response.body).toBeTruthy();
   });
});
