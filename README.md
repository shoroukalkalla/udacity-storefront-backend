# Storefront Backend Project

## How to run this project

-  Create .env file in root directory

   ```bash
   PORT=4000
   ENV=dev

   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_DB=storefront
   POSTGRES_USER=YOUR_POSTGRES_USER (default: postgres)
   POSTGRES_PASSWORD=YOUR_POSTGRES_PASSWORD
   POSTGRES_TEST_DB=storefront_test

   jwtSecret=YOUR_JWT_SECRET
   ```

-  Create Database

   ```bash
   psql -u YOUR_USERNAME -p
   CREATE DATABASE storefront;
   ```

-  Run migrations

   ```bash
   npm run migrate:run
   ```

-  Run Server

```bash
npm run watch
```

## API Endpoints

### User Endpoints

#### Register User

-  /users/register [post]
-  body {
   first_name: string
   last_name: string
   email: string
   password: string
   }

#### Login User

-  /users/login [post]
-  body {
   email: string
   password: string
   }

#### Get User

-  /users/:id [Get]
-  header { "Authorization": "Bearer TOKEN" }

#### Get All Users

-  /users/ [Get]
-  header { "Authorization": "Bearer TOKEN" }

---

### Product Endpoints

#### Create Product

-  /products [post]
-  body {
   name: string
   price: number
   }
-  header { "Authorization": "Bearer TOKEN" }

#### Get Product

-  /products/:id [Get]

#### Get All Products

-  /products/ [Get]

---

### Order Endpoints

#### Create Order

-  /orders [post]
-  body {}
-  header { "Authorization": "Bearer TOKEN" }

#### Get Order

-  /orders/:id [Get]
-  header { "Authorization": "Bearer TOKEN" }

#### Get All Orders

-  /orders/ [Get]
-  header { "Authorization": "Bearer TOKEN" }

---

### Order Products Endpoints

#### Create Order Product

-  /order-products [post]
-  body {order_id:number, product_id:number, quantity:number}
-  header { "Authorization": "Bearer TOKEN" }

#### Get Order Products

-  /order-products/:id [Get]
-  header { "Authorization": "Bearer TOKEN" }
