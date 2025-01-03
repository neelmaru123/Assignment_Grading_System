const express = require("express");
const router = express.Router();
const studentController = require('../controller/student_controller');
const upload = require('../middleware/multer_middleware');

const {
    registerStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    uploadFile,
    pendingAssignments,
    submittedAssignment
} = studentController;

router
    .route("/")
    .get(getAllStudents)
    .post(registerStudent);

router
    .route("/:id")
    .get(getStudentById)
    .put(updateStudent)
    .delete(deleteStudent);

router
    .route("/upload")
    .post(
        upload.fields([
            { name: 'file', maxCount: 1 }
        ]),
        uploadFile
    );

router
    .route("/pendingAssignments")
    .post(pendingAssignments);

router
    .route("/submittedAssignment")
    .post(submittedAssignment);

module.exports = router;