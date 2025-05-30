// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// const checkIfAdmin = async(email) => {
//     try {
//         const admins = await prisma.admin.findUnique({
//             where : {
//                 email : email
//             }
//         });
//         return admins;
//     } 
//     catch (err) {
//         console.log("Error in finding admin in admin.js!");
//         console.log(err.stack);
//     }
// }

// module.exports = {checkIfAdmin};
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const checkIfAdmin = async (email) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });
    return admin;
  } catch (err) {
    console.log("Error in finding admin in admin.js!");
    console.log(err.stack);
    throw err;
  }
};

module.exports = { checkIfAdmin };  