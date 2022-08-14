import { User } from "../../models/user";
import Product, { ProductTypes } from "./../../models/product";

describe("Test Product Model", () => {
   const product = new Product();

   it("should be defined", () => {
      expect(product).toBeDefined();
   });
});

describe("Test Product Logic Model", () => {
   const product = new Product();

   it("Create Method should create a product", async () => {
      const user = new User();
      const data = {
         first_name: "John2",
         last_name: "Doe2",
         email: "johnDoe2@mail.com",
         password: "12345",
      };
      const newUser = await user.register(data);

      const productData: ProductTypes = {
         name: "product",
         price: 100,
      };
      const newProduct = product.create(productData, newUser.id || "");

      expect(newProduct).toBeTruthy();
   });

   it("Index Method should get all products", async () => {
      const products = await product.index();
      expect(products.length).toBeGreaterThan(0);
   });

   it("Show Method should get a product", async () => {
      const getProduct = await product.show("1");
      expect(getProduct).toBeTruthy();
   });
});
