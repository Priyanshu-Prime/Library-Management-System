const cron = require("cron");
const {sendEmail} = require("../controllers/emailcontrol");

cron.schedule('0 9 * * *', () =>
{
    console.log("Running daily check for overdue books: ");
    sendEmail();
});