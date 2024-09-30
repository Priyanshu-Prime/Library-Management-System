const transporter = require("../config/nodemailer");
const {Pool} = require("pg");
const moment = require("moment");

const pool = new Pool(
    {
        user : process.env.PG_USER,
        host : process.env.PG_HOST,
        database : process.env.PG_DATABASE,
        password : process.env.PG_PASSWORD,
        port : process.env.PG_PORT
    }
);

const sendEmail = async(req, res) =>
{
    try
    {
        const today = moment().format("YYYY-MM-DD");
        const q = "SELECT b.name as title, s.name as name, s.email as email, i.date_of_return FROM issues i INNER JOIN student s ON s.roll_no = i.student_id INNER JOIN book b ON b.id = i.book_id WHERE i.date_of_return < CURRENT_DATE";

        const result = await pool.query(q);
        const overdues = result.rows;
        console.log(overdues);
        if (overdues.length > 0)
        {
            overdues.forEach(book => 
            {
                const {title, name, email, date_of_return} = book;
                console.log(`${title} ${name} ${email} ${date_of_return}`);
                const mailOptions = 
                {
                    from: process.env.MY_EMAIL,
                    to: email,
                    subject: "Library Book Return Reminder",
                    text: `Dear ${name}, \n\nYou have an overdue book titled ${title}. The due date was ${date_of_return}. Return the book to the library as soon as possible.\n\nRegards,\n Library Management System`,
                };
                transporter.sendMail(mailOptions, (error, info) =>
                {
                    if (error)
                        console.error("Error sending email: ", error);
                    else
                        console.log("Reminder email sent to: ", email);
                })
            }
            )
        }
        else
        {
            console.log("No overdue books found");
        }
    }
    catch(err)
    {
        console.error("Error in checking overdue books: ", err);
    }
};

module.exports = {sendEmail};
