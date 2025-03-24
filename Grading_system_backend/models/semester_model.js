const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
    semesterName: {
        type: String,
        required: true
    },
    totalStudents: {
        type: Number
    },
}, { timestamps: true }, {collection : "Semesters"});

module.exports = mongoose.model("Semester", semesterSchema)