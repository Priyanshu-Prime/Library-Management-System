const express = require("express");
const {allRecords, recordByBookId, recordByStudentId, defaultersList,recordDelete,issuesFilter, markReturned, getUnreturnedRecords, addRecord} = require("../controllers/issuingcontrol");
const router = express.Router();

router.get("/issues", allRecords);

router.post("/issues", addRecord);

router.get("/issues/unreturned", getUnreturnedRecords);

router.get("/issues/book/:id", recordByBookId);

router.get("/issues/student/:id", recordByStudentId);

router.get("/issues/defaulters", defaultersList);

router.delete("/issues/delete/:id",recordDelete);

router.get("/issues/filter/:searchText",issuesFilter);

router.patch("/issues/return/:bookid", markReturned);

module.exports = router;