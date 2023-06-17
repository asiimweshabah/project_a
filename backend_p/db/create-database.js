const executeQuery = require("./execute-query");

const createDatabase = async (dbName) => {
  try {
    await executeQuery(`CREATE DATABASE IF NOT EXISTS ${dbName}`, null, true);
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
  )`;

const createUsersTable = async () => {
  try {
    const results = await executeQuery(createUsersTableQuery);
    // console.log("Users table created successfully", results);
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

// Create orders table
const createOrdersTableQuery = `
CREATE TABLE IF NOT EXISTS orders (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Product VARCHAR(255) NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  Quantity INT NOT NULL,
  Amount DECIMAL(10, 2) NOT NULL
)`;

const createOrdersTable = async () => {
  try {
    const results = await executeQuery(createOrdersTableQuery);
    // console.log("Orders table created successfully", results);
  } catch (error) {
    console.error("Error creating orders table:", error);
  }
};

// Create combined table for users and orders
const createUsersOrderQuery = `
CREATE TABLE IF NOT EXISTS userOrder (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT NOT NULL,
  Product VARCHAR(255) NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  Quantity INT NOT NULL,
  Amount DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (UserId) REFERENCES users(Id)
)`;

const createUsersOrder = async () => {
  try {
    const results = await executeQuery(createUsersOrderQuery);
    // console.log("Combined table created successfully", results);
  } catch (error) {
    console.error("Error creating combined table:", error);
  }
};

module.exports = {
  createDatabase,
  createUsersTable,
  createOrdersTable,
  createUsersOrder,
};
