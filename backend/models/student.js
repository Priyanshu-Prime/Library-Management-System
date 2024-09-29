const pool = require("../config/db");

const getAllStudents = async() =>
{
    try 
    {
        const data = await pool.query("SELECT * FROM students");
        return data.rows;
    }
    catch(err)
    {
        console.log("Error in getAllStudents in students.js");
        throw err;
    }
};

const getStudentByID = async(id) =>
{
    try
    {
        const data = await pool.query("SELECT * FROM students WHERE roll_no=$1", [id]);
        return data.rows[0];
    }
    catch(err)
    {
        console.log("Error in getStudentsByID in students.js");
        throw err;
    }
};

const addStudent = async(roll_no, name, email, contact) =>
{
    try
    {
        const data = await pool.query("INSERT INTO students VALUES($1, $2, $3, $4) RETURNING *", [roll_no, name, email, contact]);
        return data.rows[0];
    }
    catch(err)
    {
        console.log("Error in addStudents in students.js");
        throw err;
    }
};

const updateStudent = async(oldroll_no, roll_no, name, email, contact) =>
{
    try
    {
        const data = await pool.query("UPDATE students SET roll_no=$1, name=$2, email=$3, contact=$4 where roll_no=$5", [roll_no, name, email, contact, oldroll_no]);
        return data.rows[0];
    }
    catch(err)
    {
        console.log("Error in updateStudents in students.js");
        throw err;
    }
};

const deleteStudent = async(id) =>
{
    try
    {
        const data = await pool.query("DELETE FROM students WHERE roll_no=$1", [id]);
        console.log("Students deleted");
    }
    catch(err)
    {
        console.log("Error in deleteStudents in students.js");
        throw err;
    }
};

module.exports = {getAllStudents, getStudentByID, addStudent, updateStudent, deleteStudent};