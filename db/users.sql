DROP TABLE if EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(200) NOT NULL CHECK (first_name <> ''),
    last_name VARCHAR(200) NOT NULL CHECK (last_name <> ''),
    profil_pic VARCHAR(300),
    bio TEXT,
    email VARCHAR(300) UNIQUE NOT NULL CHECK (email <> ''),
    password VARCHAR(300) NOT NULL CHECK (password <> '')
);

INSERT INTO users (first_name, last_name, email, password)