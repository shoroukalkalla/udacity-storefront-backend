import { User } from "../../models/user";

describe("Test User Model", () => {
   const user = new User();
   it("should be defined", () => {
      expect(user).toBeDefined();
   });
});

describe("Test User Logic Model", () => {
   const user = new User();

   it("Register Method should register a user", async () => {
      const data = {
         first_name: "John",
         last_name: "Doe",
         email: "johnDoe11@mail.com",
         password: "12345",
      };
      const newUser = await user.register(data);

      expect(newUser).toBeTruthy();
   });

   it("Login Method should login a user", async () => {
      const currentUser = await user.login("johnDoe11@mail.com");
      expect(currentUser).toBeTruthy();
   });

   it("Index Method should get all users", async () => {
      const users = await user.index();
      expect(users.length).toBeGreaterThan(0);
   });

   it("Show Method should return one user", async () => {
      const u = user.show("1");
      expect(u).toBeTruthy();
   });
});
