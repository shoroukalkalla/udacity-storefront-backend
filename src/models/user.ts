import client from "../database";
import bcrypt from "bcrypt";

export type UserTypes = {
   id?: string;
   first_name: string;
   last_name: string;
   email: string;
   password?: string;
};

export class User {
   //register user
   async register(u: UserTypes): Promise<UserTypes> {
      try {
         const sql =
            "INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING id, first_name, last_name, email";
         const conn = await client.connect();

         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(u.password || " ", salt);

         const result = await conn.query(sql, [
            u.first_name,
            u.last_name,
            u.email,
            hashedPassword,
         ]);

         const user = result.rows[0];

         conn.release();

         return user;
      } catch (err) {
         throw new Error(`Could not register ${u.email}. Error: ${err}`);
      }
   }

   //login user

   async login(email: string): Promise<UserTypes> {
      try {
         const conn = await client.connect();
         const sql = "SELECT * FROM users WHERE email = $1";
         const result = await conn.query(sql, [email]);
         conn.release();
         return result.rows[0];
      } catch (err) {
         throw new Error(`Could not login ${email}. Error: ${err}`);
      }
   }

   //get all users
   async index(): Promise<UserTypes[]> {
      try {
         const conn = await client.connect();
         const sql = "SELECT id, first_name, last_name, email FROM users";
         const result = await conn.query(sql);
         conn.release();
         return result.rows;
      } catch (err) {
         throw new Error(`Could not get users. Error: ${err}`);
      }
   }

   //get user
   async show(id: string): Promise<UserTypes> {
      try {
         const conn = await client.connect();
         const sql =
            "SELECT id, first_name, last_name, email FROM users where id=$1";
         const result = await conn.query(sql, [id]);
         conn.release();
         return result.rows[0];
      } catch (err) {
         throw new Error(`Couldn't find user ${id}. Error: ${err}`);
      }
   }
}
