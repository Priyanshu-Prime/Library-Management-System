const express = require("express");
const {allStudents, studentByID, createStudent, changeStudent, removeStudent, studentFilter} = require("../controllers/studentcontrol.js");
const router = express.Router();

router.get("/students", allStudents);

router.get("/students/:id", studentByID);

router.post("/students", createStudent);

router.patch("/students/:oldid", changeStudent);

router.delete("/students/:id", removeStudent);

router.get("/students/filter/:searchterm", studentFilter);

module.exports = router;