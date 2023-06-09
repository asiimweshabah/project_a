const createConnection = require("./connect-to-database");
module.exports = async function executeQuery(sql, parameters = null) {
  try {
    const connection = await createConnection();
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
    await connection.end();
    return results[0];
  } catch (error) {
    console.log(error);
  }
};
