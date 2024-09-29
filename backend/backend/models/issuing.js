const pool = require("../config/db");

const getAllRecords = async() =>
{
    try
    {
        const data = await pool.query("SELECT * FROM issues");
        return data.rows;
    }
    catch (err)
    {
        console.log("Error in getAllRecords in issuing.js");
        throw err;
    }
};

const getRecordByBookID = async(id) =>
{
    try
    {
        const data = await pool.query("SELECT * FROM issues WHERE book_id=$1", [id]);
        return data.rows;
    }
    catch(err)
    {
        console.log("Error in getRecordByBookID in issuing.js");
        throw err;
    }
};

const getRecordByStudentID = async(id) =>
{
    try
    {
        const data = await pool.query("SELECT * FROM issues WHERE student_id=$1", [id]);
        return data.rows;
    }
    catch(err)
    {
        console.log("Error in getRecordByStudentID in issuing.js");
        throw err;
    }
};

const getDefaulters = async() =>
{
    try
    {
        const data = await pool.query("SELECT * FROM issues WHERE date_of_return < CURRENT_DATE");
        return data.rows;
    }
    catch(err)
    {
        console.log("Error in getDefaulters in issuing.js");
        throw err;
    }
};

module.exports = {getAllRecords, getRecordByBookID, getRecordByStudentID, getDefaulters};