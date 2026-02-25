const express = require("express");
const {allRecords, recordByBookId, recordByStudentId, defaultersList,recordDelete,issuesFilter, markReturned, getUnreturnedRecords, addRecord} = require("../controllers/issuingcontrol");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const router = express.Router();

router.get("/issues", authMiddleware, adminMiddleware, allRecords);

router.post("/issues", authMiddleware, adminMiddleware, addRecord);

router.get("/issues/unreturned", authMiddleware, adminMiddleware, getUnreturnedRecords);

router.get("/issues/book/:id", authMiddleware, adminMiddleware, recordByBookId);

router.get("/issues/student/:id", authMiddleware, recordByStudentId);

router.get("/issues/defaulters", authMiddleware, adminMiddleware, defaultersList);

router.delete("/issues/delete/:id", authMiddleware, adminMiddleware, recordDelete);

router.get("/issues/filter/:searchText", authMiddleware, adminMiddleware, issuesFilter);

router.patch("/issues/return/:bookid", authMiddleware, adminMiddleware, markReturned);

module.exports = router;