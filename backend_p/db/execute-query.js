const createConnection = require("./connect-to-database");

module.exports = async (sql, parameters = null, createDb = false) => {
  let connection;
  try {
    connection = await createConnection(createDb);
    await connection.connect();
    let results;
    if (!parameters) {
      if (sql.includes("?")) {
        throw { message: `parameters are required` };
      }
      results = await connection.query(sql);
    } else {
      if (Array.isArray(parameters) && parameters.length) {
        results = await connection.query(sql, parameters);
      } else {
        throw { message: `parameters are required` };
      }
    }
    return results[0];
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
