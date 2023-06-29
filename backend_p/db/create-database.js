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
  users_Id INT AUTO_INCREMENT PRIMARY KEY,
  Company VARCHAR(255) NOT NULL,
  UserType VARCHAR(255) NOT NULL,
  Username VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  PasswordHash VARCHAR(255) NOT NULL,
  status ENUM('Active','Inactive') DEFAULT 'Active',
  dateOfJoining date DEFAULT CURRENT_TIMESTAMP
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
const createProductsTableQuery = `
CREATE TABLE IF NOT EXISTS products (
  product_Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  Product VARCHAR(255) NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  Quantity INT NOT NULL,
  Amount DECIMAL(10, 2) NOT NULL
)`;

const createProductsTable = async () => {
  try {
    const results = await executeQuery(createProductsTableQuery);
    // console.log("Orders table created successfully", results);
  } catch (error) {
    console.error("Error creating orders table:", error);
  }
};

// Create combined table for users and orders
const createOrdersTableQuery = `
CREATE TABLE IF NOT EXISTS orders (
  order_Id INT AUTO_INCREMENT PRIMARY KEY,
  product_Id INT NOT NULL,
  user_Id INT NOT NULL,
  Username VARCHAR(255),
  Product VARCHAR(255) NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  Quantity INT NOT NULL,
  Amount DECIMAL(10, 2) NOT NULL,
  order_date DATE DEFAULT CURRENT_TIMESTAMP,
  debt FLOAT,
  FOREIGN KEY (user_Id) REFERENCES users (users_Id),
  FOREIGN KEY (product_Id) REFERENCES products (product_Id)
)`;

const createOrdersTable = async () => {
  try {
    const results = await executeQuery(createOrdersTableQuery);
  } catch (error) {
    console.error("Error creating combined table:", error);
  }
};

module.exports = {
  createDatabase,
  createUsersTable,
  createProductsTable,
  createOrdersTable,
};
