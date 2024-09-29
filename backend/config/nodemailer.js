const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.getTestMessageUrl(
    {
        service: "gmail",
        auth: 
        {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    }
);

module.exports = transporter;