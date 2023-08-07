const executeQuery = require("./execute-query");
const bcrypt = require("bcrypt");

const createDatabase = async (dbName) => {
  try {
    await executeQuery(`CREATE DATABASE IF NOT EXISTS ${dbName}`, null, true);
  } catch (error) {
    console.log(error);
  }
};

const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  users_Id INT AUTO_INCREMENT PRIMARY KEY,
  Company VARCHAR(255) NOT NULL,
  UserType VARCHAR(255) NOT NULL,
  Username VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  PasswordHash VARCHAR(255) NOT NULL,
  status ENUM('Active','Inactive') DEFAULT 'Inactive',
  dateOfJoining date DEFAULT CURRENT_TIMESTAMP
  )`;

const createUsersTable = async () => {
  try {
    const results = await executeQuery(createUsersTableQuery);
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

const createProductsTableQuery = `
CREATE TABLE IF NOT EXISTS products (
  product_Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  Product VARCHAR(255) NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  Quantity INT NOT NULL,
  Amount DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL
)`;

const createProductsTable = async () => {
  try {
    const results = await executeQuery(createProductsTableQuery);
  } catch (error) {
    console.error("Error creating orders table:", error);
  }
};

const createOrdersTableQuery = `
CREATE TABLE IF NOT EXISTS orders (
  order_Id INT AUTO_INCREMENT PRIMARY KEY,
  users_Id INT NOT NULL,
  Username VARCHAR(255) NOT NULL,
  product_Id INT NOT NULL,
  Product VARCHAR(255) NOT NULL,
  Price DECIMAL(10, 2),
  Quantity INT,
  Amount DECIMAL(10, 2),
  total_amount DECIMAL(10, 2) NOT NULL,
  order_date DATE DEFAULT CURRENT_TIMESTAMP,
  debt FLOAT,
  FOREIGN KEY (users_Id) REFERENCES users(users_Id) ON DELETE CASCADE,
  FOREIGN KEY (product_Id) REFERENCES products(product_Id) ON DELETE CASCADE
)`;

const createOrdersTable = async () => {
  try {
    const results = await executeQuery(createOrdersTableQuery);
  } catch (error) {
    console.error("Error creating combined table:", error);
  }
};

const createAdmin = async () => {
  try {
    const sqlFind = "SELECT COUNT(Email) as COUNT from users WHERE Email = ?";
    const countResults = await executeQuery(sqlFind, [process.env.admin_Email]);
    if (!countResults?.[0]?.COUNT) {
      const sql = `INSERT INTO users (Username,Email,PasswordHash,UserType,Company,status) values( ?, ?, ?, ?, ?, ?)`;
      await executeQuery(sql, [
        process.env.admin_Username,
        process.env.admin_Email,
        await bcrypt.hash(process.env.admin_PasswordHash, 6),
        "Super Admin",
        "Odysseytech",
        process.env.admin_status,
      ]);
    }
  } catch (error) {
    console.error("Error creating combined table:", error);
  }
};

module.exports = {
  createDatabase,
  createUsersTable,
  createProductsTable,
  createOrdersTable,
  createAdmin,
};
