// const executeQuery = require("./execute-query");

// const createDatabase = async (dbName) => {
//   try {
//     await executeQuery(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
//   } catch (error) {
//     console.log(error);
//   }
// };

// // regestering users
// const createTableQuery = `
// CREATE TABLE IF NOT EXISTS users (
//   Id INT AUTO_INCREMENT PRIMARY KEY,
//   Company VARCHAR(255) NOT NULL,
//   UserType VARCHAR(255) NOT NULL,
//   Username VARCHAR(255) NOT NULL,
//   Email VARCHAR(255) NOT NULL,
//   PasswordHash VARCHAR(255) NOT NULL
// )
// `;

// const createTables = async () => {
//   try {
//     const results = await executeQuery(createTableQuery);
//     console.log("Table created successfully", results);
//   } catch (error) {
//     console.error("Error creating table:", error);
//   }
// };
// const createOrderTableQuery = `
// CREATE TABLE IF NOT EXISTS orders (
//   Id INT AUTO_INCREMENT PRIMARY KEY,
//   Product VARCHAR(255) NOT NULL,
//   Price DECIMAL(10, 2) NOT NULL,
//   Quantity INT NOT NULL,
//   Amount DECIMAL(10, 2) NOT NULL
// )
// `;

// // create order table
// const createOrderTable = async () => {
//   try {
//     const results = await executeQuery(createOrderTableQuery);
//     console.log("Order table created successfully", results);
//   } catch (error) {
//     console.error("Error creating order table:", error);
//   }
// };

// module.exports = {
//   createDatabase,
//   createTables,
//   createOrderTable,
// };

const executeQuery = require("./execute-query");

const createDatabase = async (dbName) => {
  try {
    await executeQuery(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
  } catch (error) {
    console.log(error);
  }
};

// Registering users table
const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Company VARCHAR(255) NOT NULL,
  UserType VARCHAR(255) NOT NULL,
  Username VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  PasswordHash VARCHAR(255) NOT NULL
)
`;

const createUsersTable = async () => {
  try {
    const results = await executeQuery(createUsersTableQuery);
    console.log("Users table created successfully", results);
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

// Create orders table
const createOrdersTableQuery = `
CREATE TABLE IF NOT EXISTS orders (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT NOT NULL,
  Product VARCHAR(255) NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  Quantity INT NOT NULL,
  Amount DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (UserId) REFERENCES users(Id)
)
`;

const createOrdersTable = async () => {
  try {
    const results = await executeQuery(createOrdersTableQuery);
    console.log("Orders table created successfully", results);
  } catch (error) {
    console.error("Error creating orders table:", error);
  }
};

// Create orderHistory table that joins users and orders
const createOrderHistoryTableQuery = `
CREATE TABLE IF NOT EXISTS orderHistory (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT NOT NULL,
  Product VARCHAR(255) NOT NULL,
  Amount DECIMAL(10, 2) NOT NULL,
  Company VARCHAR(255) NOT NULL,
  UserType VARCHAR(255) NOT NULL,
  Username VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  FOREIGN KEY (UserId) REFERENCES users(Id)
)
`;

const createOrderHistoryTable = async () => {
  try {
    const results = await executeQuery(createOrderHistoryTableQuery);
    console.log("OrderHistory table created successfully", results);
  } catch (error) {
    console.error("Error creating OrderHistory table:", error);
  }
};

module.exports = {
  createDatabase,
  createUsersTable,
  createOrdersTable,
  createOrderHistoryTable,
};
