const { getAllRecords, addIssueRecord, getRecordByBookID, getRecordByStudentID, getDefaulters ,deleteRecord,filterIssues, returnIssues, unreturnedRecords} = require("../models/issuing");

const allRecords = async (req, res) => {
    try {
        const record = await getAllRecords();
        res.status(200).json(record);
    }
    catch (err) {
        console.log("Error in allRecords in issuingcontrol.js");
        res.status(500).json({ error: "Failed to get records" });
        console.log(err.stack);
    }
};

const addRecord = async (req, res) => {
    const { book_id, student_id, date_of_issue, date_of_return, returned } = req.body;
    console.log(req.body);
    if (!book_id || !student_id || !date_of_issue || !date_of_return || returned === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    // console.log(book_id, student_id, date_of_issue, date_of_return); 

    try {
        const newRecord = await addIssueRecord(book_id, student_id, date_of_issue, date_of_return);
        res.status(201).json(newRecord);
    } catch (err) {
        console.log("Error in addRecord in issuingcontrol.js");
        res.status(500).json({ error: "Failed to add issue record" });
    }
};

const getUnreturnedRecords = async(req, res) =>
{
    try
    {
        const record = await unreturnedRecords();
        res.status(200).json(record);
    }
    catch(err)
    {
        console.log("Error in getUnreturnedRecords in issuingcontrol.js");
        res.status(500).json({error: "Failed to get unreturned records"});
        console.log(err.stack);
    }
}

const recordByBookId = async (req, res) => {
    const {id} = req.params;
    try {
        const record = await getRecordByBookID(id);
        res.status(200).json(record);
    }
    catch (err) {
        console.log("Error in RecordByBookId in issuingcontrol.js");
        res.status(500).json({ error: "Failed to get record" });
    }
};

const recordByStudentId = async (req, res) => {
    const {id} = req.params;
    try {
        const record = await getRecordByStudentID(id);
        // console.log(record);
        res.status(200).json(record);
    }
    catch (err) {
        console.log("Error in RecordByStudentId in issuingcontrol.js");
        res.status(500).json({ error: "Failed to get record" });
    }
};

const defaultersList = async (req, res) => {
    try {
        const record = await getDefaulters();
        console.log(record)
        res.status(200).json(record);
    }
    catch (err) {
        console.log("Error in DefaultersList in issuingcontrol.js");
        res.status(500).json({ error: "Failed to get defaulters" });
    }
};

//ADD A REMOVE RECORD FUNCTION TOO
const recordDelete = async(req,res) => {
    try {
        const id = req.params.id;
        const deletedRecords = await deleteRecord(id);
        res.status(200).json({message: "Record Deleted Succesfully!"});
    } 
    catch (err) {
        console.log("Error in recordDelete in issuingcontrol.js!");
        console.log(err.stack);
    }
};

const issuesFilter = async(req,res) => {
    try {
        const {searchText} = req.params;
        console.log(searchText);
        const filteredRecords = await filterIssues(searchText);
        res.status(200).json(filteredRecords);
    } 
    catch (error) {
        console.log("Error in filtering issues in ");  
    }
};

const markReturned = async(req, res) =>
{
    try
    {
        const { bookid } = req.params;
        const record = await returnIssues(bookid);
        res.status(200).json({message: "Book has been returned successfully"});
    }
    catch(err)
    {
        console.log("Error in markReturned in issuingcontrol.js");
    }
}

module.exports = {allRecords, addRecord, recordByBookId, recordByStudentId, defaultersList,recordDelete,issuesFilter, markReturned, getUnreturnedRecords};