const router = require('express').Router();

const { registerSubject,
    getAllSubjects,
    updateSbuject,
    deleteSubject,
    getSubjectBySemester,
    getSubjectByFaculty,
    getSubjectById } = require('../controller/subject_controller');

router
    .post('/registerSubject', registerSubject)
    .get('/getAllSubjects', getAllSubjects)
    .put('/updateSubject/:id', updateSbuject)
    .delete('/deleteSubject/:id', deleteSubject)
    .get('/getSubjectByFaculty/:facultyId', getSubjectByFaculty)
    .get('/getSubjectById/:id', getSubjectById)
    .get('/getSubjectBySemester/:semesterId', getSubjectBySemester);

module.exports = router;