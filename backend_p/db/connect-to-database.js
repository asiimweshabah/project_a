const mysql2 = require("mysql2/promise");

module.exports = async (createDb = false) => {
  let connection = mysql2.createConnection({
    port: Number(process.env.mysqlport),
    host: process.env.mysqlhost,
    user: process.env.user,
    password: process.env.password,
    ...(createDb == false && { database: process.env.database }),
  });
  return connection;
};
