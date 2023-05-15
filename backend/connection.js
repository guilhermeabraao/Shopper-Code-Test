const knex = require('knex')({
    client: 'mysql',
    connection: process.env.DB_URL
});

module.exports = knex;