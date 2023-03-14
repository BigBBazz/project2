CREATE DATABASE learning_app;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);

CREATE TABLE user_learning (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    learning, TEXT,
);

CREATE TABLE learning (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
);


