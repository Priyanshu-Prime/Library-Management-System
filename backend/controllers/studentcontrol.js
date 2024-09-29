const { getAllStudents, getStudentByID, addStudent, updateStudent, deleteStudent } = require("../models/student");

// -----------------------------------------------------------------
// Notes for fellow developers:-
// CreateStudent Incomplete
// ChangeStudent Incomplete
// -----------------------------------------------------------------


const allStudents = async (req, res) => {
    try {
        const students = await getAllStudents();
        req.status(200).json(students);
    }
    catch (err) {
        console.log("Error in allStudents in issuingcontrol.js");
        res.status(500).json({ error: "Failed to get students" });
    }
};

const studentByID = async (req, res) => {
    const {id} = req.params;
    try {
        const students = await getStudentByID(id);
        req.status(200).json(students);
    }
    catch (err) {
        console.log("Error in StudentByID in issuingcontrol.js");
        res.status(500).json({ error: "Failed to get students" });
    }
};

const createStudent = async (req, res) => 
{
    const {roll_no, name, email, contact} = req.body;
    try {
        const students = await addStudent(roll_no, name, email, contact);
        req.status(200).json(students);
    }
    catch (err) {
        console.log("Error in createStudent in issuingcontrol.js");
        res.status(500).json({ error: "Failed to create student" });
    }
};


const changeStudent = async (req, res) => {
    const {oldid} = req.params;
    const {roll_no, name, email, contact} = req.body;
    try {
        const students = await updateStudent(oldid, roll_no, name, email, contact);
        req.status(200).json(students);
    }
    catch (err) {
        console.log("Error in changeStudent in issuingcontrol.js");
        res.status(500).json({ error: "Failed to change student" });
    }
};

const removeStudent = async(req, res) =>
{
    const {id} = req.params;
    try
    {
        const students = await deleteStudent(id);
        req.status(200).json(students);
    }
    catch (err)
    {
        console.log("Error in removeStudent in issuingcontrol.js");
        res.status(500).json({ error: "Failed to remove student" });
    }
}

module.exports = {allStudents, studentByID, createStudent, changeStudent, removeStudent}