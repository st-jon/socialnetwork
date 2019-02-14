DROP TABLE if EXISTS wall;

CREATE TABLE wall(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id),
    first_name VARCHAR(200) NOT NULL CHECK (first_name <> ''),
    last_name VARCHAR(200) NOT NULL CHECK (last_name <> ''),
    profil_pic VARCHAR(300),
    picture VARCHAR(400),
    messages TEXT NOT NULL CHECK (messages <> ''),
    link VARCHAR(400),
    descriptions TEXT,
    publisher VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);