import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    pool: {
      min: 2,
      max: 100
    },
    migrations: {
      directory: __dirname + "/src/infrastructure/database/migrations",
      tableName: "migrations",
      loadExtensions: [".ts"]
    },
    seeds: {
      directory: __dirname + "/src/infrastructure/database/seeds",
      loadExtensions: [".ts"]
    }
  },

  staging: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 100
    },
    migrations: {
      directory: __dirname + "/src/infrastructure/database/migrations",
      tableName: "migrations",
      loadExtensions: [".js"]
    },
    seeds: {
      directory: __dirname + "/src/infrastructure/database/seeds",
      loadExtensions: [".js"]
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 100
    },
    migrations: {
      directory: __dirname + "/src/infrastructure/database/migrations",
      tableName: "migrations",
      loadExtensions: [".js"]
    },
    seeds: {
      directory: __dirname + "/src/infrastructure/database/seeds",
      loadExtensions: [".js"]
    }
  }
};

module.exports = config;
