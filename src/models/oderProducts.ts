import client from "../database";

export class OrderProducts {
   //create order product
   async create(order_id: string, product_id: string, quantity: number) {
      try {
         const conn = await client.connect();
         const sql =
            "INSERT INTO order_products(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
         const result = await conn.query(sql, [order_id, product_id, quantity]);
         conn.release();
         return result.rows[0];
      } catch (err) {
         throw new Error(`Couldn't create Order Product`);
      }
   }

   //get order products
   async index(order_id: string) {
      try {
         const conn = await client.connect();
         const sql = "SELECT * FROM order_products where order_id = $1";
         const result = await conn.query(sql, [order_id]);
         conn.release();
         return result.rows;
      } catch (err) {
         throw new Error(
            `Couldn't find by order_id ${order_id}. Error: ${err}`
         );
      }
   }
}
