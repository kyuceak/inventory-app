#! /usr/bin/env node

const { Client } = require("pg");

const connectionString = process.argv[2];

const SQL = `

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    description VARCHAR ( 255 ),
    category_image BYTEA
);




CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  release_date DATE,
  price NUMERIC,
  rating NUMERIC,
  game_image BYTEA
);



CREATE TABLE IF NOT EXISTS developers (
     id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255)
);

INSERT INTO developers (name) VALUES 
('Rockstar Games'),('ex2');


CREATE TABLE IF NOT EXISTS games_developers (
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    developer_id INTEGER REFERENCES  developers(id) ON DELETE CASCADE,
    PRIMARY KEY(game_id, developer_id)
);


CREATE TABLE IF NOT EXISTS games_categories(
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY(game_id, category_id)
);



`;

// INSERT INTO games (name, release_date, price, rating) VALUES
//   ('Game One', '2022-01-01', 59.99, 4.5),
//   ('Game Two', '2021-05-15', 39.99, 4.2);


// INSERT INTO categories (name) VALUES 
//     ('Action'), ('Adventure'), ('Fantasy'), ('Open World'), ('Puzzle'),
//     ('Racing'), ('Shooter'), ('Simulation'), ('Sports'), ('Strategy');

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();