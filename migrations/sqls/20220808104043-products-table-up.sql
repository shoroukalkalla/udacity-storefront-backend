-- SQLBook: Code
/* Replace with your SQL commands */

CREATE TABLE
    products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        price DECIMAL NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    );