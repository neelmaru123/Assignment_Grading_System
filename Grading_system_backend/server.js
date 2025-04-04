const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5000;

const connectDB = require("./config/DBconnection");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Define a general rate limit for all routes
// const generalLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per windowMs
//     message: {
//         status: 429,
//         error: 'Too many requests from this IP, please try again later.',
//     },
// });

// Define a stricter rate limit for sensitive routes (e.g., login)
// const loginLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 10, // Limit each IP to 10 login requests per windowMs
//     message: {
//         status: 429,
//         error: 'Too many login attempts, please try again later.',
//     },
// });

// // Apply the general limiter globally
// app.use(generalLimiter);

// Apply the login limiter to the auth route
// app.use('/auth', loginLimiter);
app.use(helmet());

// Connect to MongoDB
connectDB();

app.use(cors());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connection.once("open", () => {
    console.log("connected to mongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

const studentRoutes = require("./routes/student_routes");
const facultyRoutes = require("./routes/faculty_routes");
const assignmentRoutes = require("./routes/assignment_routes");
const authRoutes = require("./routes/auth_route");
const semesterRoutes = require("./routes/semester_routes");
const subjectRoutes = require("./routes/subject_routes");
const notificationRoutes = require("./routes/notification_routes");

// define a simple route
app.use("/students", studentRoutes);
app.use("/faculties", facultyRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/auth", authRoutes);
app.use("/semesters", semesterRoutes);
app.use("/subjects", subjectRoutes);
app.use("/notifications", notificationRoutes);

const { processQueue } = require('./workers/processQueue');

setInterval(async () => {
    await processQueue();
}, 10000); // Check every 10 seconds

