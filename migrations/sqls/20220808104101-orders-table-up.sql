-- SQLBook: Code
/* Replace with your SQL commands */

CREATE TYPE status AS ENUM ('active', 'complete');

CREATE TABLE
    orders(
        id SERIAL PRIMARY KEY,
        order_status status DEFAULT 'active',
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    );
