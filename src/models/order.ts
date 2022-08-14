import client from "../database";

export type OrderTypes = {
   id?: string;
   user_id: string;
   order_status: string;
};

export class Order {
   //create order
   async create(user_id: string): Promise<OrderTypes> {
      try {
         const conn = await client.connect();
         const sql = "INSERT INTO orders(user_id) VALUES($1) RETURNING *";
         const result = await conn.query(sql, [user_id]);
         conn.release();
         return result.rows[0];
      } catch (err) {
         throw new Error(`Couldn't create Order. Error: {error}`);
      }
   }

   //get user orders
   async index(user_id: string): Promise<OrderTypes[]> {
      try {
         const conn = await client.connect();
         const sql = "SELECT * FROM orders WHERE user_id=$1";
         const result = await conn.query(sql, [user_id]);
         conn.release();
         return result.rows;
      } catch (err) {
         throw new Error(
            `Couldn't find Order by user_id:${user_id}. Error: ${err}`
         );
      }
   }
}
