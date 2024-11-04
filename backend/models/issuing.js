const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const getAllRecords = async() => {
    try {
        const records = await prisma.issues.findMany({
            select: {
                book: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                student: {
                    select: {
                        roll_no: true,
                        name: true,
                    }
                },
                date_of_issue: true,
                date_of_return: true
            },
        });

        const formattedRecords = records.map(record => ({
            book_id: record.book.id,
            title: record.book.name,
            student_id: record.student.roll_no,
            name: record.student.name, 
            date_of_issue: record.date_of_issue, 
            date_of_return: record.date_of_return,
        }))

        return formattedRecords;
    }
    catch (err) {
        console.log("Error in getAllRecords in issuing.js");
        console.log(err.stack);
        throw err;
    }
}

const getRecordByBookID = async(id) => {
    try {
        const record = await prisma.issues.findUnique({
            where: {
                book_id: id
            }
        });
        return record;
    }
    catch(err) {
        console.log("Error in getRecordByBookID in issuing.js");
        console.log(err.stack);
        throw err;
    }
};

const getRecordByStudentID = async(id) => {
    try {
        const record = await prisma.issues.findMany({
            where: {
                student_id: Number(id)
            }
        });
        return record;
    }
    catch(err) {
        console.log("Error in getRecordByStudentID in issuing.js");
        console.log(err.stack);
        throw err;
    }
};

const getDefaulters = async() => {
    try {
        const defaulters = await prisma.issues.findMany({
            where: {
                date_of_return: {
                    lt: new Date()
                }
            }
        });
        return defaulters;
    }
    catch(err) {
        console.log("Error in getDefaulters in issuing.js");
        console.log(err.stack);
        throw err;
    }
};

//ADD A REMOVE RECORDS FUNCTION TOO

const deleteRecord = async(id) => {
    try {
        const deletedRecords = await prisma.issues.delete({
            where : {
                book_id : id
            }
        });
        console.log("Issue Record deleted!");
        return deletedRecords;
    }
    catch(err) {
        console.log("Error in delteRecord in issuing.js!");
        console.log(err.stack);
        throw err;
    }
}

module.exports = {getAllRecords, getRecordByBookID, getRecordByStudentID, getDefaulters,deleteRecord};