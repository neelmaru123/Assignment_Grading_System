const assignmentController = require('../controller/assignment_controller');
const express = require("express");
const router = express.Router();

const {
    registerAssignment,
    getAllAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment,
    pendingStudents,
    removeSubmiitedAssignment,
    submittedStudents,
} = assignmentController;

router
    .route("/")
    .post(getAllAssignments)

router
    .route("/register")
    .post(registerAssignment);

router
    .route("/:id")
    .get(getAssignmentById)
    .put(updateAssignment)
    .delete(deleteAssignment);

router
    .route("/pendingStudents")
    .post(pendingStudents);

router
    .route("/submittedStudents")
    .post(submittedStudents);

router 
    .route("/removeAssignment")
    .post(removeSubmiitedAssignment)

module.exports = router;
