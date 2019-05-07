'use strict';

const database = require('./database.js');

module.exports.get_countdown = async (event, context) => {
  const queryString = `SELECT * FROM countdowns
                      WHERE token = ?;`;

  const db = new database.Database({
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PW,
    queryString: queryString,
    queryParams: [event.queryStringParameters.token],
  });

  const result = await db.getQueryResult();

  return {
    body: JSON.stringify({
      target: result[0].target,
      created_at: result[0].created_at,
    }),
  };
};