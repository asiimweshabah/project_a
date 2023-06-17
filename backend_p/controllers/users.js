const executeQuery = require("../db/execute-query");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("crypto").randomBytes(64).toString("hex");

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

async function sendVerificationMessage(email) {
  try {
    const mailOptions = {
      from: "shaban.asiimwe.upti@gmail.com",
      to: email,
      subject: "Set password to login",
      html: `<body>
        <h1>Create an account</h1>
        <a href="http://localhost:3000/setpassword?email=${email}">
          <button className="btn btn-primary">Create</button>
        </a>
      </body>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Failed to send verification email:", error);
  }
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "36000s" });
}

module.exports = {
  //logout user
  async logout(req, res, next) {
    try {
      req.session.destroy(); // Clear the session

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
      await sendVerificationMessage(email);

      return res.send({
        message: "User registered successfully. Verification email sent.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  },

  async setPassword(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 6);
      console.log("email", email);
      const updatePasswordQuery =
        "UPDATE users SET PasswordHash = ? WHERE email = ?";
      await executeQuery(updatePasswordQuery, [hashedPassword, email]);

      res.send({ message: "Password set successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // Check if the user exists in the database
      const checkUserQuery = "SELECT * FROM users WHERE email = ?";
      const user = await executeQuery(checkUserQuery, [email]);
      if (user.length === 0) {
        return res.status(401).send({ error: "Invalid username or password" });
      }

      const isValidPassword = await bcrypt.compare(
        password,
        user[0].PasswordHash
      );
      if (!isValidPassword) {
        return res.status(401).send({ error: "Invalid username or password" });
      }

      // Generate the access token with the user's email
      const token = generateAccessToken(user[0]);

      return res.status(200).send({
        token,
        email: user[0].email,
        message: "User logged in successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
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
};
