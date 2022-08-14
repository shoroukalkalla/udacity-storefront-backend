import client from "../database";

export type ProductTypes = {
   id?: string;
   name: string;
   price: number;
};

export class Product {
   //create product
   async create(p: ProductTypes, user_id: string): Promise<ProductTypes> {
      try {
         const sql =
            "INSERT INTO products (name, price, user_id) VALUES($1, $2, $3) RETURNING *";
         const conn = await client.connect();

         const result = await conn.query(sql, [p.name, p.price, user_id]);

         const product = result.rows[0];

         conn.release();

         return product;
      } catch (err) {
         throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
      }
   }

   //get all products
   async index(): Promise<ProductTypes[]> {
      try {
         const conn = await client.connect();
         const sql = "SELECT * FROM products";
         const result = await conn.query(sql);
         conn.release();
         return result.rows;
      } catch (err) {
         throw new Error(`Cannot get products. Error: ${err}`);
      }
   }

   //get product
   async show(id: string): Promise<ProductTypes> {
      try {
         const conn = await client.connect();
         const sql = "SELECT * FROM products WHERE id=$1";
         const result = await conn.query(sql, [id]);
         conn.release();
         return result.rows[0];
      } catch (err) {
         throw new Error(`Couldn't find book ${id}. Error: ${err}`);
      }
   }
}

export default Product;
