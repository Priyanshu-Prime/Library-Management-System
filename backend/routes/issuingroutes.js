const express = require("express");
const {allRecords, recordByBookId, recordByStudentId, defaultersList,recordDelete} = require("../controllers/issuingcontrol");
const router = express.Router();

router.get("/issues", allRecords);

router.get("/issues/book/:id", recordByBookId);

router.get("/issues/student/:id", recordByStudentId);

router.get("/issues/defaulters", defaultersList);

router.delete("/issues/delete/:id",recordDelete);

module.exports = router;