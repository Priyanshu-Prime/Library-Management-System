const express = require("express");
const {allStudents, studentByID, createStudent, changeStudent, removeStudent, studentFilter} = require("../controllers/studentcontrol.js");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const router = express.Router();

router.get("/students", authMiddleware, allStudents);

router.get("/students/:id", authMiddleware, studentByID);

router.post("/students", authMiddleware, adminMiddleware, createStudent);

router.patch("/students/:oldid", authMiddleware, adminMiddleware, changeStudent);

router.delete("/students/:id", authMiddleware, adminMiddleware, removeStudent);

router.get("/students/filter/:searchterm", authMiddleware, studentFilter);

module.exports = router;