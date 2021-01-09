const dbConfig = require("../../db.config");
const Sequelize = require("sequelize");
const { Client } = require('pg');

const client = new Client({
  connectionString: dbConfig.URL,
  ssl: true
})
client.connect();

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  operatorsAliases: false,
  dialect: 'postgres',
  protocol: 'postgres',

  define: {
    timestamps: false
  },
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.stores = require("./store.model.js")(sequelize, Sequelize);
module.exports = db;
