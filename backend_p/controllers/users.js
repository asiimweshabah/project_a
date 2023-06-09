const executeQuery = require("../db/execute-query");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

module.exports = {
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
  // verification

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

      // Generate verification token
      const verificationToken = uuidv4();

      // Store user details and verification token in the database
      const insertUserQuery =
        "INSERT INTO users (Company, UserType, Username, Email, xapp-1-A05C4K4TUF3-5400653547795-d07078a07b20294f1c653264fa37327c581b2c8a557dd97916f9d6177f2ed0bc) VALUES (?, ?, ?, ?, ?)";
      await executeQuery(insertUserQuery, [
        company,
        userType,
        username,
        email,
        xapp -
          1 -
          A05C4K4TUF3 -
          5400653547795 -
          d07078a07b20294f1c653264fa37327c581b2c8a557dd97916f9d6177f2ed0bc,
      ]);

      // Send verification message (via Slack or any other method)
      await sendVerificationMessage(
        email,
        xapp -
          1 -
          A05C4K4TUF3 -
          5400653547795 -
          d07078a07b20294f1c653264fa37327c581b2c8a557dd97916f9d6177f2ed0bc
      );

      res.send({
        message: "User registered successfully. Verification message sent.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        error: error.message,
      });
    }
  },

  //Start of verification message

  async sendVerificationMessage(email, verificationToken) {
    const slackMessage = `Please click the following link to set your password and complete the registration: <link-to-verification-page?token=${
      xapp -
      1 -
      A05C4K4TUF3 -
      5400653547795 -
      d07078a07b20294f1c653264fa37327c581b2c8a557dd97916f9d6177f2ed0bc
    }>`;

    const slackApiUrl = "https://slack.com/api/chat.postMessage";
    const slackApiToken = "YOUR_SLACK_API_TOKEN"; // Replace with your actual Slack API token

    const payload = {
      channel: email, // Replace with the appropriate channel or user ID
      text: slackMessage,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${slackApiToken}`,
    };

    try {
      const response = await axios.post(slackApiUrl, payload, { headers });
      console.log("Slack message sent:", response.data);
    } catch (error) {
      console.error("Failed to send Slack message:", error.message);
    }
  },

  //end of verification message

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

      // Email doesn't exist, proceed with registration
      const insertUserQuery =
        "INSERT INTO users (Company, UserType, Username, Email) VALUES (?, ?, ?, ?)";
      await executeQuery(insertUserQuery, [company, userType, username, email]);

      // Send registration email
      await this.sendRegistrationEmail(email, username);

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
