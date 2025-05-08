// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();
// const ALLOWED_DOMAIN = 'iiitt.ac.in';
// const JWT_SECRET=process.env.JWT_SECRET;

// const {checkIfAdmin} = require("../models/admin");

// const googleLogin = (req, res) =>
// {
//     const {name, email} = req.body;

//     const emailDomain = email.split('@')[1];
//     const emailUser = email.split('@')[0];

//     if (emailDomain != ALLOWED_DOMAIN)
//     {
//         console.log("Email not accepted login failed");
//         return res.status(403).json({ message: "IIITT email not found!" });
//     }
//     const token = jwt.sign({email}, JWT_SECRET, {expiresIn: '1h'});

//     res.status(200).json({token, name, emailUser, message: "Login successful!"});
//     console.log("Email accepted login done");
// }

// module.exports = {googleLogin};
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { checkIfAdmin } = require("../models/admin");

const JWT_SECRET = process.env.JWT_SECRET;
const ALLOWED_DOMAIN = 'iiitt.ac.in';

const googleLogin = async (req, res) => {
  const { name, email } = req.body;

  const emailDomain = email.split('@')[1];
  const emailUser = email.split('@')[0];

  if (emailDomain !== ALLOWED_DOMAIN) {
    console.log("Email not accepted, login failed");
    return res.status(403).json({ message: "IIITT email not found!" });
  }

  try {
    const admin = await checkIfAdmin(email);
    const isAdmin = !!admin;

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, name, emailUser, isAdmin, message: "Login successful!" });
    console.log("Email accepted, login successful");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { googleLogin };