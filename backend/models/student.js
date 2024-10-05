const pool = require("../config/db");

const getAllStudents = async() =>
{
    try 
    {
        const data = await pool.query("SELECT * FROM student");
        return data.rows;
    }
    catch(err)
    {
        console.log("Error in getAllStudents in student.js");
        throw err;
    }
};

const getStudentByID = async(id) =>
{
    try
    {
        const data = await pool.query("SELECT * FROM student WHERE roll_no=$1", [id]);
        return data.rows[0];
    }
    catch(err)
    {
        console.log("Error in getStudentsByID in student.js");
        throw err;
    }
};

const addStudent = async(roll_no, name, email, contact) =>
{
    try
    {
        const data = await pool.query("INSERT INTO student VALUES($1, $2, $3, $4) RETURNING *", [roll_no, name, email, contact]);
        return data.rows[0];
    }
    catch(err)
    {
        console.log("Error in addStudents in student.js");
        throw err;
    }
};

const updateStudent = async(oldroll_no, roll_no, name, email, contact) =>
{
    try
    {
        const data = await pool.query("UPDATE student SET roll_no=$1, name=$2, email=$3, contact=$4 where roll_no=$5", [roll_no, name, email, contact, oldroll_no]);
        return data.rows[0];
    }
    catch(err)
    {
        console.log("Error in updateStudents in student.js");
        throw err;
    }
};

const deleteStudent = async(id) =>
{
    try
    {
        const data = await pool.query("DELETE FROM student WHERE roll_no=$1", [id]);
        console.log("Students deleted");
    }
    catch(err)
    {
        console.log("Error in deleteStudents in student.js");
        throw err;
    }
};

module.exports = {getAllStudents, getStudentByID, addStudent, updateStudent, deleteStudent};