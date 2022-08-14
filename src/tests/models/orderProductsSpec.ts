import { User } from "../../models/user";
import Product, { ProductTypes } from "./../../models/product";
import { OrderProducts } from "./../../models/oderProducts";
import { Order } from "../../models/order";

describe("Test Product Model", () => {
   const orderProducts = new OrderProducts();

   it("should be defined", () => {
      expect(orderProducts).toBeDefined();
   });
});

describe("Test Order Product Logic Model", () => {
   const orderProducts = new OrderProducts();
   let order_id: string = "";

   it("Create Method should create an order Product", async () => {
      const data = {
         first_name: "John4",
         last_name: "Doe4",
         email: "johnDoe4@mail.com",
         password: "12345",
      };
      const user = await new User().register(data);

      const productData: ProductTypes = {
         name: "product",
         price: 100,
      };
      const product = await new Product().create(productData, user.id || "");
      const order = await new Order().create(user.id || "");
      order_id = order.id || "";

      const newOrderProducts = orderProducts.create(
         order.id || "",
         product.id || "",
         4
      );

      expect(newOrderProducts).toBeTruthy();
   });

   it("Index Method should get all order products", async () => {
      const o = await orderProducts.index(order_id);
      expect(o.length).toBeGreaterThan(0);
   });
});
