const { Pool } = require("pg") // connection pool

const config = {
  dev: {
    database:"learning_app",
  },
  prod: {
    connectionString: process.env.DATABASE_URL,
  },
}

// establish a pool of connections that we can use to talk to the database

module.exports = new Pool(process.env.DATABASE_URL ? config.prod : config.dev)