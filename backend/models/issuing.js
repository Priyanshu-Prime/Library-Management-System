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

const getRecordByStudentID = async (id) => {
    try {
        const record = await prisma.issues.findMany({
            where: {
                student_id: Number(id),
            },
            include: {
                book: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return record;
    } catch (err) {
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

const filterIssues = async(searchText) => {
    try {
        const filteredRecords = await prisma.issues.findMany({
            where: {
                OR: [
                    {
                        book_id: {
                            contains: searchText,
                            mode: 'insensitive',
                        },
                    },
                    {
                        student_id: searchText,
                        mode: 'insensitve',
                    },
                    {
                        date_of_issue: {
                            contains: searchText,
                            mode: 'insensitive',
                        }
                    },
                    {
                        date_of_return: {
                            contains: searchText,
                            mode: 'insensitive',
                        }
                    },
                ],
            },
        });
        return filteredRecords;
    } 
    catch (error) {
        console.log("Error in filtering issues in issuing.js");
        console.log(error.stack);   
        throw(error);   
    }
};

const returnIssues = async(bookid) =>
{
    try
    {
        await prisma.issues.updateMany({
            where:
            {
                book_id: bookid,
            },
            data:
            {
                returned: true,
            }
        });
        console.log(`Book ID: ${bookid} has been returned`);
    }
    catch(err)
    {
        console.log("Error in marking the book as returned");
        console.log(err.stack);
    }
}
 
module.exports = {getAllRecords, getRecordByBookID, getRecordByStudentID, getDefaulters,deleteRecord,filterIssues};