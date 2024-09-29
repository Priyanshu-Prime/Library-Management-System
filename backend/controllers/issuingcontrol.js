const { getAllRecords, getRecordByBookID, getRecordByStudentID, getDefaulters } = require("../models/issuing");

const allRecords = async (req, res) => {
    try {
        const record = await getAllRecords();
        res.status(200).json(books);
    }
    catch (err) {
        console.log("Error in allRecords in issuingcontrol.js");
        res.status(500).json({ error: "Failed to get records" });
    }
};
const recordByBookId = async (req, res) => {
    try {
        const record = await getRecordByBookID();
        res.status(200).json(record);
    }
    catch (err) {
        console.log("Error in RecordByBookId in issuingcontrol.js");
        res.status(500).json({ error: "Failed to get record" });
    }
};
const recordByStudentId = async (req, res) => {
    try {
        const record = await getRecordByStudentID();
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

module.exports = {allRecords, recordByBookId, recordByStudentId, defaultersList};