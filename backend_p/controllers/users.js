const executeQuery = require("../db/execute-query");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

module.exports = {
  //Sending a verification message
  async sendVerificationEmail(email, verificationToken) {
    // Create a Nodemailer transporter using your email service configuration
    const transporter = nodemailer.createTransport({
      // Configure the transporter options for your email service
      // For example, using SMTP:
      host: "smtp.example.com",
      port: 587,
      secure: false,
      auth: {
        user: "your-email@example.com",
        pass: "your-email-password",
      },
    });

    // Create the email message
    const message = {
      from: "your-email@example.com",
      to: email,
      subject: "Account Verification",
      text: `Please click on the following link to set your password: https://your-app.com/set-password?token=${verificationToken}`,
    };

    // Send the email
    await transporter.sendMail(message);
  },

  //end of sending a verifiaction

  //logouy user
  async logout(req, res, next) {
    try {
      // Clear the user session or token here
      // Example: req.session.user = null;

      res.send({ message: "User logged out successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to logout user", error: error.message });
    }
  },

  //registrng user
  async register(req, res, next) {
    try {
      const email = req.body.email;
      const username = req.body.username;
      const company = req.body.company;
      const userType = req.body.userType;

      // Check if email already exists
      const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
      const existingUser = await executeQuery(checkEmailQuery, [email]);
      if (existingUser.length > 0) {
        // Email already exists
        return res.status(400).send({ error: "User already exists" });
      }
      // Generate a verification token
      const verificationToken = generateVerificationToken();
      // Store user details and verification token in the database
      const insertUserQuery =
        "INSERT INTO users (Company, UserType, Username, Email, VerificationToken) VALUES (?, ?, ?, ?, ?)";
      await executeQuery(insertUserQuery, [
        company,
        userType,
        username,
        email,
        verificationToken,
      ]);

      // Send verification email
      await sendVerificationEmail(email, verificationToken);

      res.send({
        message: "User registered successfully. Verification email sent.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        error: error.message,
      });
    }
  },

  //end of registrng user
  // Login controller
  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      // Check if user exists in the database
      const checkUserQuery = "SELECT * FROM users WHERE email = ?";
      const existingUser = await executeQuery(checkUserQuery, [email]);
      if (existingUser.length === 0) {
        // User does not exist, return an error message
        return res.status(401).send({ message: "User does not exist" });
      }

      const user = existingUser[0];

      if (user.password === password) {
        // Password matches, user is logged in successfully
        res.send({ message: "User logged in successfully", user });
      } else {
        // Invalid password
        res.status(401).send({ message: "Invalid password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Wrong password/username or user doesnot exist",
        error: error.message,
      });
    }
  },

  // getAllUsers
  async getAllUsers(req, res, next) {
    try {
      const getUsersQuery = "SELECT * FROM users";
      const users = await executeQuery(getUsersQuery);
      res.send(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to fetch users", error: error.message });
    }
  },

  // deleteUser
  async deleteUser(req, res, next) {
    try {
      const userId = req.params.id;

      // Your logic to delete the user from the database
      const deleteQuery = `DELETE FROM users WHERE id = ${userId}`;
      await executeQuery(deleteQuery);

      res.send({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to delete user", error: error.message });
    }
  },

  // Activate a user
  async activateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const activateUserQuery = `
      UPDATE users
      SET status = 'active'
      WHERE id = ?
    `;
      // await executeQuery(activateUserQuery, [userId]);
      res.send({ message: "User activated successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to activate user", error: error.message });
    }
  },

  // Deactivate a user
  async deactivateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const deactivateUserQuery = `
      UPDATE users
      SET status = 'inactive'
      WHERE id = ?
    `;
      await executeQuery(deactivateUserQuery, [userId]);
      res.send({ message: "User deactivated successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to deactivate user", error: error.message });
    }
  },
};
