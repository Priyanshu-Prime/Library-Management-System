const { getAllStudents, getStudentByID, addStudent, updateStudent, deleteStudent, filterStudents } = require("../models/student");

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
        if(!students)
        {
            return res.status(404).json({error: "Student not found"});
        }
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
    if (!roll_no || !name || !email || !contact) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const students = await addStudent(parseInt(roll_no), name, email, contact);
        res.status(201).json(students);
    }
    catch (err) {
        console.log("Error in createStudent in studentcontrol.js ", err);
        res.status(500).json({ error: "Failed to create student", details: err.message});
    }
};


const changeStudent = async (req, res) => {
    const {oldid} = req.params;
    const {roll_no, name, email, contact} = req.body;
    try {
        const students = await updateStudent(oldid, parseInt(roll_no), name, email, contact);
        res.status(200).json(students);
    }
    catch (err) {
        console.log("Error in changeStudent in studentcontrol.js");
        res.status(500).json({ error: "Failed to change student" });
    }
};

const removeStudent = async(req, res) =>
{
    try
    {
        const {id} = req.params;
        const students = await deleteStudent(parseInt(id));
        res.status(200).json({message: "Student deleted successfully"});
    }
    catch (err)
    {
        console.log("Error in removeStudent in studentcontrol.js");
        res.status(500).json({ error: "Failed to remove student" });
    }   
}

const studentFilter = async (req, res) => {
    const { searchterm } = req.params;
    try {
        const records = await filterStudents(searchterm);
        res.status(200).json(records);
    }
    catch (err) {
        console.log("Error in studentFilter in studentcontrol.js");
        res.status(500).json({ error: "Failed to filter students" });
    }
};

module.exports = {allStudents, studentByID, createStudent, changeStudent, removeStudent, studentFilter}