const { getAllStudents, getStudentByID, addStudent, updateStudent, deleteStudent } = require("../models/student");

// -----------------------------------------------------------------
// Notes for fellow developers:-
// CreateStudent Incomplete
// ChangeStudent Incomplete
// -----------------------------------------------------------------


const allStudents = async (req, res) => {
    try {
        const stduents = await getAllStudents();
        req.status(200).json(students);
    }
    catch (err) {
        console.log("Error in allStudents in issuingcontrol.js");
        res.status(500).json({ error: "Failed to get students" });
    }
};

const StudentByID = async (req, res) => {
    try {
        const stduents = await getStudentByID();
        req.status(200).json(students);
    }
    catch (err) {
        console.log("Error in StudentByID in issuingcontrol.js");
        res.status(500).json({ error: "Failed to get students" });
    }
};


// Unfinished Business : (Reason : Schema for student table unknown)
// const createStudent = async (req, res) => {
//     try {
//         const stduents = await getStudentByID();
//         req.status(200).json(students);
//     }
//     catch (err) {
//         console.log("Error in StudentByID in issuingcontrol.js");
//         res.status(500).json({ error: "Failed to get students" });
//     }
// };



// Unfinished business : (Reason : Schema for student table unknown)
// const changeStudent = async (req, res) => {
//     try {
//         const stduents = await updateStudent();
//         req.status(200).json(students);
//     }
//     catch (err) {
//         console.log("Error in allStudents in issuingcontrol.js");
//         res.status(500).json({ error: "Failed to get students" });
//     }
// };