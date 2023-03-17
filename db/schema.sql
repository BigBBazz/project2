CREATE DATABASE learning_app;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);

CREATE TABLE learnings (
    learning_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    learning_name TEXT,
    learnArray TEXT[],
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
);


CREATE TABLE notes_code (
    notes_id SERIAL PRIMARY KEY,
    learning_id INTEGER,
    user_id INTEGER,
    learning_name TEXT,
    notes TEXT
);



