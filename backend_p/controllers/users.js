const executeQuery = require("../db/execute-query");
const bcrypt = require("bcrypt"); //hiding password
const nodemailer = require("nodemailer"); // sending messages
const jwt = require("jsonwebtoken");
const cron = require("cron"); // making alert alarm
require("crypto").randomBytes(64).toString("hex"); //It generates a specified number of random bytes.

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
        <a href="https://odysseybreaksytem.netlify.app/setpassword?email=${email}">
          <button style="background-color: #5f2781; border-radius: 10px; border: #5f2781; color: white; padding: 10px 20px; cursor: pointer;">Create Account</button>
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
  return jwt.sign(user, process.env.TOKEN_SECRET /*, { expiresIn: "36000s" }*/);
}

//placing order alarm alert
async function sendOrderPlacementAlert(userId, orderId, username) {
  try {
    const user = await executeQuery(
      "SELECT email FROM users WHERE users_Id = ?",
      [userId]
    );

    const mailOptions = {
      from: "your-email@example.com",
      to: user[0].email,
      subject: "Reminder to place order",
      html: `
        <body>
          <h1>Make your breakfast order</h1>
          <p>You have an order pending. Please place the order before it expires.</p>
          <a href="https://odysseybreaksytem.netlify.app">
          <button style="background-color: #5f2781; border-radius: 10px; border: #5f2781; color: white; padding: 10px 20px; cursor: pointer;">Make Order</button>
        </a>
        </body>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Order placement alert email sent successfully");
  } catch (error) {
    console.error("Failed to send order placement alert email:", error);
  }
}

async function handleOrderReminder() {
  try {
    const orders = await executeQuery("SELECT * FROM orders");

    for (const order of orders) {
      const userId = order.users_Id;
      const user = await executeQuery(
        "SELECT status FROM users WHERE users_Id = ?",
        [userId]
      );

      if (
        user.length > 0 &&
        user[0].status === "Active" &&
        order.status !== "Completed"
      ) {
        await sendOrderPlacementAlert(userId, order.order_Id);
      }
    }
  } catch (error) {
    console.error("Failed to handle order reminder:", error);
  }
}

const scheduler1 = new cron.CronJob("0 8 * * *", handleOrderReminder); // 8am
const scheduler2 = new cron.CronJob("0 18 * * *", handleOrderReminder); //6pm

scheduler1.start(); //calling alert 1 to place order
scheduler2.start(); //calling alert 2 to place order

module.exports = {
  //logout user
  async logout(req, res) {
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

  async register(req, res) {
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

  async setPassword(req, res) {
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

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Check if the user exists in the database
      const checkUserQuery = "SELECT * FROM users WHERE email = ?";
      const user = await executeQuery(checkUserQuery, [email]);
      if (user.length === 0) {
        return res.status(401).send({ error: "Invalid username or password" });
      }

      // Get the hash of the password from the database
      const hashedPassword = user[0].PasswordHash;
      console.log(hashedPassword);

      // Compare the password that the user entered to the hash of the password in the database
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);
      if (!isPasswordValid) {
        return res.status(401).send({ error: "Invalid username or password" });
      }

      // Generate the access token with the user's email
      const token = generateAccessToken(user[0]);

      return res.status(200).send({
        token,
        user: {
          users_Id: user[0].users_Id,
          Username: user[0].Username,
          Email: user[0].Email,
          UserType: user[0].UserType,
        },
        message: "User logged in successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  },

  async getAllUsers(req, res) {
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

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      const deleteQuery = `DELETE FROM users WHERE users_Id = ${userId}`;
      await executeQuery(deleteQuery);

      res.send({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to delete user", error: error.message });
    }
  },

  async activateUser(req, res) {
    try {
      const userId = req.params.id;

      const activateQuery = `UPDATE users SET status = 'Active' WHERE users_Id = ${userId}`;
      await executeQuery(activateQuery);

      res.send({ message: "User activated successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to activate user", error: error.message });
    }
  },

  async deactivateUser(req, res) {
    try {
      const userId = req.params.id;

      const deactivateQuery = `UPDATE users SET status = 'Inactive' WHERE users_Id = ${userId}`;
      await executeQuery(deactivateQuery);

      res.send({ message: "User deactivated successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to deactivate user", error: error.message });
    }
  },
};
