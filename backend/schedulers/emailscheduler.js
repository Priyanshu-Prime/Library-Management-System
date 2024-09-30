const cron = require("node-cron");
const {sendEmail} = require("../controllers/emailcontrol");

cron.schedule('51 10 * * *', () =>
{
    console.log("Running daily check for overdue books: ");
    sendEmail();
});