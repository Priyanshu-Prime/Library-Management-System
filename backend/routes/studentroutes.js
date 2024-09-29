const express = require("express");
const {allStudents, studentByID, createStudent, changeStudent, removeStudent} = require("../controllers/studentcontrol.js");
const router = express.Router();

router.get("/students", allStudents);

router.get("/students/:id", studentByID);

router.post("/students", createStudent);

router.patch("/students/:oldid", changeStudent);

router.delete("/students/:id", removeStudent);

module.exports = router;