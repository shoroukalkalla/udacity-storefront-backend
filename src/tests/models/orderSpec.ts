import { Order } from "../../models/order";
import { User } from "../../models/user";

describe("Test Order Model", () => {
   const order = new Order();

   it("should be defined", () => {
      expect(order).toBeDefined();
   });
});

describe("Test Order Logic Model", () => {
   const order = new Order();

   it("Create Method should create an order", async () => {
      const user = new User();
      const data = {
         first_name: "John3",
         last_name: "Doe3",
         email: "johnDoe3@mail.com",
         password: "12345",
      };
      const newUser = await user.register(data);

      const newOrder = order.create(newUser.id || "");

      expect(newOrder).toBeTruthy();
   });

   it("Index Method show get all user products", async () => {
      const orders = await order.index("1");
      expect(orders.length).toBeGreaterThan(0);
   });
});
