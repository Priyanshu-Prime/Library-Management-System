const { getAllRecords, getRecordByBookID, getRecordByStudentID, getDefaulters ,deleteRecord} = require("../models/issuing");

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
        const id = req.params;
        const deletedRecords = await deleteRecord(id);
        res.status(200).json({message: "Record Deleted Succesfully!"});
    } 
    catch (err) {
        console.log("Error in recordDelete in issuingcontrol.js!");
        console.log(err.stack);
    }
}

module.exports = {allRecords, recordByBookId, recordByStudentId, defaultersList,recordDelete};