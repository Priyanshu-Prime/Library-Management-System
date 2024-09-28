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
        const data = await pool.query("SELECT * FROM students WHERE id=$1", [id]);
        return data.rows[0];
    }
    catch(err)
    {
        console.log("Error in getStudentsByID in students.js");
        throw err;
    }
};

const addStudent = async(id, name, author) =>
{
    try
    {
        const data = await pool.query("INSERT INTO students VALUES($1, $2, $3) RETURNING *", [id, name, author]);
        return data.rows[0];
    }
    catch(err)
    {
        console.log("Error in addStudents in students.js");
        throw err;
    }
};

const updateStudent = async(id, name, author) =>
{
    try
    {
        const data = await pool.query("UPDATE students SET id=$1, name=$2, author=$3", [id, name, author]);
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
        const data = await pool.query("DELETE FROM students WHERE id=$1", [id]);
        console.log("Students deleted");
    }
    catch(err)
    {
        console.log("Error in deleteStudents in students.js");
        throw err;
    }
};

module.exports = {getAllStudents, getStudentByID, addStudent, updateStudent, deleteStudent};