const { getAllStudents, getStudentByID, addStudent, updateStudent, deleteStudent } = require("../models/student");

const allStudents = async (req, res) => {
    try {
        // console.log("ADD IDS CALLED");
        const students = await getAllStudents();
        res.status(200).json(students);
    }
    catch (err) {
        console.log("Error in allStudents in studentcontrol.js");
        res.status(500).json({ error: "Failed to get students" });
    }
};

const studentByID = async (req, res) => {
    const {id} = req.params;
    // console.log(id);
    try {
        const students = await getStudentByID(id);
        // console.log(`This is in controller`);
        // console.log(students);
        res.status(200).json(students);
    }
    catch (err) {
        console.log("Error in StudentByID in studentcontrol.js");
        res.status(500).json({ error: "Failed to get students" });
    }
};

const createStudent = async (req, res) => 
{
    const {roll_no, name, email, contact} = req.body;
    try {
        const students = await addStudent(roll_no, name, email, contact);
        res.status(200).json(students);
    }
    catch (err) {
        console.log("Error in createStudent in studentcontrol.js");
        res.status(500).json({ error: "Failed to create student" });
    }
};


const changeStudent = async (req, res) => {
    const {oldid} = req.params;
    const {roll_no, name, email, contact} = req.body;
    try {
        const students = await updateStudent(oldid, roll_no, name, email, contact);
        res.status(200).json(students);
    }
    catch (err) {
        console.log("Error in changeStudent in studentcontrol.js");
        res.status(500).json({ error: "Failed to change student" });
    }
};

const removeStudent = async(req, res) =>
{
    const {id} = req.params;
    try
    {
        const students = await deleteStudent(id);
        res.status(200).json(students);
    }
    catch (err)
    {
        console.log("Error in removeStudent in studentcontrol.js");
        res.status(500).json({ error: "Failed to remove student" });
    }   
}

module.exports = {allStudents, studentByID, createStudent, changeStudent, removeStudent}