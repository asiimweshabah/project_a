const executeQuery = require("../db/execute-query");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "shaban.asiimwe.upti@gmail.com",
    pass: "zordpsgqqgbsyaka",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendVerificationMessage(email, verificationToken) {
  try {
    const mailOptions = {
      from: "shaban.asiimwe.upti@gmail.com",
      to: email,
      subject: "Set password to login",
      html: `<body>
        <h1>Click here to set your password</h1>
        <a href="http://localhost:3000/setpassword?token=${verificationToken}">
          <button>Go set Password</button>
        </a>
      </body>`,
    };

    // Save the verification token to the user's record in the database
    const saveVerificationTokenQuery =
      "UPDATE users SET VerificationToken = ? WHERE Email = ?";
    await executeQuery(saveVerificationTokenQuery, [verificationToken, email]);

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Failed to send verification email:", error);
  }
}

module.exports = {
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

      // Save the user with the verification token to the database
      const insertUserQuery =
        "INSERT INTO users (Company, UserType, Username, Email) VALUES (?, ?, ?, ?)";
      await executeQuery(insertUserQuery, [company, userType, username, email]);

      // Send registration email with the verification link
      await sendVerificationMessage(email);

      res.send({
        message: "User registered successfully. Verification email sent.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  },

  async setPassword(req, res, next) {
    try {
      const userId = req.body.id;
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 6);

      const updatePasswordQuery = "UPDATE users SET Password = ? WHERE id = ?";
      await executeQuery(updatePasswordQuery, [hashedPassword, userId]);

      res.send({ message: "Password set successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  },

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

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.Password);

      if (passwordMatch) {
        // Password matches, user is logged in successfully
        res.send({ message: "User logged in successfully", user });
      } else {
        // Invalid password
        res.status(401).send({ message: "Invalid password" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to login", error: error.message });
    }
  },

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

  async deleteUser(req, res, next) {
    try {
      const userId = req.params.id;

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

  async activateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const activateUserQuery = `
      UPDATE users
      SET status = 'active'
      WHERE id = ?
    `;
      await executeQuery(activateUserQuery, [userId]);
      res.send({ message: "User activated successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to activate user", error: error.message });
    }
  },

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
