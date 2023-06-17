const executeQuery = require("../db/execute-query");

async function createTables() {
  try {
    await executeQuery(createUsersOrderQuery);
    console.log("userOrder table created successfully");
  } catch (error) {
    console.error("Failed to create userOrder table:", error);
  }
}

createTables();
