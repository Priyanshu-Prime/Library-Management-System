const express = require("express");
const {allRecords, recordByBookId, recordByStudentId, defaultersList} = require("../controllers/issuingcontrol");
const router = express.Router();

router.get("/issues", allRecords);

router.get("/issues/book/:id", recordByBookId);

router.get("/issues/student/:id", recordByStudentId);

router.get("/issues/defaulters", defaultersList);