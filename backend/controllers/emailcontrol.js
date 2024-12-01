const { PrismaClient } = require('@prisma/client');
const transporter = require("../config/nodemailer");
const moment = require("moment");

const prisma = new PrismaClient();

const sendEmail = async (req, res) => {
    try {
        const today = moment().format("YYYY-MM-DD");

        // Fetch books with overdue return dates using Prisma
        const overdues = await prisma.issues.findMany({
            where: {
                date_of_return: { lt: new Date() },
            },
            include: {
                book: true,
                student: true,
            },
        });

        console.log(overdues);

        if (overdues.length > 0) {
            overdues.forEach((issue) => {
                const { name: title } = issue.book;
                const { name, email } = issue.student;
                const { date_of_return } = issue;

                console.log(`${title} ${name} ${email} ${date_of_return}`);

                const mailOptions = {
                    from: process.env.MY_EMAIL,
                    to: email,
                    subject: "Library Book Return Reminder",
                    text: `Dear ${name},\n\nYou have an overdue book titled "${title}". The due date was ${moment(date_of_return).format("YYYY-MM-DD")}. Please return the book to the library as soon as possible.\n\nRegards,\nLibrary Management System`,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                    } else {
                        console.log("Reminder email sent to:", email);
                    }
                });
            });
        } else {
            console.log("No overdue books found");
        }
    } catch (err) {
        console.error("Error in checking overdue books in sendEmail:", err);
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = { sendEmail };
