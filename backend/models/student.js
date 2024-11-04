const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const getAllStudents = async() => {
    try {
        const allStudents = await prisma.student.findMany();
        return allStudents;
    }
    catch(err) {
        console.log("Error in getAllStudents in student.js");
        throw err;
    }
};

const getStudentByID = async(id) => {
    try {
        console.log(id);
        const student = await prisma.student.findUnique({
            where: {
                roll_no: parseInt(id)
            }
        });
        return student;
    }
    catch(err) {
        console.log("Error in getStudentsByID in student.js");
        console.log(err.stack);
        throw err;
    }
};

const addStudent = async(roll_no, name, email, contact) => {
    try {
        const newStudent = await prisma.student.create({
            data: {
                roll_no: roll_no,
                name: name,
                email: email,
                contact: contact
            }
        });
        console.log("Student added");
        return newStudent;
    }
    catch(err) {
        console.log("Error in addStudents in student.js");
        console.log(err.stack);
        throw err;
    }
};

const updateStudent = async(oldroll_no, roll_no, name, email, contact) => {
    try {
        const updatedStudent = await prisma.student.update({
            where: {
                roll_no: Number(oldroll_no),
            },
            data: {
                roll_no: roll_no,
                name: name,
                email: email,
                contact: contact
            }
        })
        console.log("Student updated");
        return updatedStudent;
    }
    catch(err) {
        console.log("Error in updateStudents in student.js");
        console.log(err.stack);
        throw err;
    }
};

const deleteStudent = async(id) => {
    try {
        const deletedStudent = await prisma.student.delete({
            where: {
                roll_no: Number(id)
            }
        })
        console.log("Student deleted");
        return deletedStudent;
    }
    catch(err) {
        console.log("Error in deleteStudents in student.js");
        console.log(err.stack);
        throw err;
    }
};

module.exports = {getAllStudents, getStudentByID, addStudent, updateStudent, deleteStudent};