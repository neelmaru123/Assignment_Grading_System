'use client'
import { Bell, ChartColumnDecreasing, ChevronDown, CrossIcon, ListChecks, ListPlus, Search, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
export default function Home() {
  const [pedningAssignment, setPedningAssignment] = useState([]);
  const [filteredPendingAssignment, setFilteredPendingAssignment] = useState("");
  const [pendingShowMore, setPendingShowMore] = useState(false);
  const [submittedShowMore, setSubmittedShowMore] = useState(false);
  const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false);
  const [submittedAssignment, setSubmittedAssignment] = useState([]);
  const [filteredSubmittedAssignment, setFilteredSubmittedAssignment] = useState("");
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);
  const [student, setStudent] = useState({});
  const [subject, setSubject] = useState([]);
  const [notification, setNotification] = useState([]);
  const fileInputRef = useRef(null);
  const studentId = localStorage.getItem('studentId');
  const [isNotificationModelOpen, setIsNotificationModelOpen] = useState(false);
  const [latestNotification, setLatestNotification] = useState([]);

  useEffect(() => {
    // Get student
    fetch("http://localhost:5000/students/" + studentId)
      .then((response) => response.json())
      .then((data) => setStudent(data));
  }, [])

  useEffect(() => {
    if (student && student.semester) {
      fetch("http://localhost:5000/semesters/getSemesterById/" + student.semester)
        .then((res) => res.json())
        .then((data) => setSubject(data.subjects))

      fetch("http://localhost:5000/notifications/student/" + studentId)
        .then((res) => res.json())
        .then((data) => setNotification(data))

      fetch("http://localhost:5000/notifications/latest/" + studentId)
        .then((res) => res.json())
        .then((data) => setLatestNotification(data))
    }
  }, [student])


  useEffect(() => {
    // Get pendingAssignment
    fetch("http://localhost:5000/students/pendingAssignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: studentId }),
    })
      .then((response) => response.json())
      .then((data) => setPedningAssignment(data));
    // submittedAssignment
    fetch("http://localhost:5000/students/submittedAssignment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: studentId }),
    })
      .then((response) => response.json())
      .then((data) => setSubmittedAssignment(data));
  }, []);

  const handleViewMoreClickForPending = () => {
    setPendingShowMore(true);
    setIsPendingModalOpen(true);
  };

  const handleViewMoreClickForSubmitted = () => {
    setSubmittedShowMore(true);
    setIsSubmittedModalOpen(true);
  };

  const filteredAssignments = pedningAssignment
    ? pedningAssignment.filter((assign) =>
      assign.subjectName?.toLowerCase().includes(filteredPendingAssignment.toLowerCase())
    ) : [];
  const assignmentsToShow = pendingShowMore ? filteredAssignments : filteredAssignments.slice(0, 3);

  const filteredSubmittedAssignments = submittedAssignment
    ? submittedAssignment.filter((assign) =>
      assign.assignmentDetails.subjectName?.toLowerCase().includes((filteredSubmittedAssignment || "").toLowerCase())
    )
    : [];
  const submittedAssignmentsToShow = submittedShowMore ? filteredSubmittedAssignments : filteredSubmittedAssignments.slice(0, 3);


  const getBackgroundColorClass = (grade) => {
    if (grade == 'A' || grade == 'A+') {
      return 'bg-green-500';
    } else if (grade == 'B' || grade == 'B+') {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  };


  const handleDivClick = () => {
    // Programmatically trigger the file input click
    fileInputRef.current.click();
  };

  const handleFileChange = async (assignmentId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("studentId", student._id); // Replace student._id with your actual student ID
    formData.append("assignmentId", assignmentId);

    try {
      const response = await fetch("http://localhost:5000/students/upload", {
        method: "POST",
        body: formData,
      });

      if (response) {
        toast.success("Assignment uploaded successfully");
      } else {
        toast.error("Failed to upload");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="ml-28 h-screen w-auto text-black p-4">
      <div className="flex flex-row justify-between mb-9">
        {/* Left Side Section  */}
        <div>
          <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center float-start relative overflow-hidden me-3">
            <Image src="/Profile.jpeg" alt="Profile Image" layout="fill" objectFit="cover" />
          </div>
          <div className="float-start h-14 w-64 bg-white rounded-full p-1 align-middle">
            <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center float-start">
              <ListChecks color="#514DEC" />
            </div>
            <div className="float-start ms-2">
              <p className="font-bold">Pending assignments</p>
              <p className="text-sm">5</p>
            </div>
          </div>
        </div>
        {/* Right side section */}
        <div>
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center float-end">
            <Bell color="#05041F" className="cursor-pointer" onClick={() => {
              setIsNotificationModelOpen(true);
            }} />
          </div>
        </div>
      </div>
      <div>
        <p className="text-gray-500 font-serif text-2xl"> Hello,</p>
        <h1 className=" font-serif font-bold text-5xl float-start me-3">{student.name}</h1>
        <div className="float-start h-14 w-48 bg-white rounded-full p-1 align-middle">
          <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center float-start">
            <ChartColumnDecreasing color="#514DEC" />
          </div>
          <div className="float-start ms-2">
            <p className="font-bold">Statistic</p>
            <p className="text-sm">Last week</p>
          </div>
        </div>
      </div>
      {/* Big box */}
      <div className="mt-4 w-full h-auto float-start bg-gray-300 rounded-2xl p-4 mb-4">
        <div className="flex space-x-3 mb-3">
          <div className="w-3/4 h-auto min-h-96 bg-white rounded-2xl p-4">
            {/* Box-1 Header Content */}
            <div className="flex flex-row justify-between">
              <p className="text-2xl font-serif font-bold mb-3">Pending assignments</p>
              <div className="flex flex-row justify-end align-middle space-x-2">
                <div className="relative">
                  <input
                    className="bg-slate-200 h-10 rounded-lg ps-3 pe-3 w-full"
                    type="text"
                    placeholder="Search by subject"
                    onChange={(e) => setFilteredPendingAssignment(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pb-1">
                    <Search className="text-gray-500" />
                  </div>
                </div>
                <div className="relative">
                  <select className="bg-slate-200 h-10 rounded-lg ps-3 pe-10 w-full appearance-none text-gray-700" onChange={(e) => {
                    setFilteredPendingAssignment(e.target.value)
                  }}>
                    <option value="">Select Subject</option>
                    {subject.map((subject) => {
                      return (
                        <option key={subject._id} value={subject.subjectName} className="text-gray-700">{subject.subjectName}</option>
                      )
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronDown className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
            {/* Box-1 Content */}
            <table className="w-full mt-4">
              <thead className="">
                <tr className="text-gray-500">
                  <th className="text-left font-serif font-bold"></th>
                  <th className="text-left font-serif font-bold w-3/6">Assignment</th>
                  <th className="text-left font-serif font-bold">Starting Date</th>
                  <th className="text-left font-serif font-bold">Last Date</th>
                  <th className="text-right font-serif font-bold">Submit</th>
                </tr>
              </thead>
              <tbody className="">
                {assignmentsToShow.map((assignment) => (
                  <tr key={assignment._id} className="align-middle h-16">
                    <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
                      {/* Icon or Image */}
                    </td>
                    <td>
                      <p className="font-serif font-bold">{assignment.subjectName}</p>
                      <p className="font-serif">{assignment.title}</p>
                    </td>
                    <td>
                      <p className="font-serif font-bold">{new Date(assignment.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td>
                      <p className="font-serif font-bold">{new Date(assignment.deadline).toLocaleDateString()}</p>
                    </td>
                    <td className="text-right">
                      <div className="bg-blue text-white p-2 rounded-full inline-flex items-center justify-center cursor-pointer" onClick={handleDivClick}>
                        <ListPlus />
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(assignment._id, e)}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="flex justify-center items-center align-middle">

                  </td>
                </tr>
              </tbody>
            </table>
            {pedningAssignment.length > 3 && (
              <div
                className="mt-4 text-gray-500 px-4 py-2 rounded w-full text-center cursor-pointer flex justify-center items-center"
                onClick={handleViewMoreClickForPending}
              >
                View More
              </div>
            )}
          </div>
          <div className="w-1/4 h-96 bg-white rounded-2xl p-4">
            {/* Box-2 Header */}
            <div>
              <p className="text-2xl font-serif font-bold mb-3">Notification</p>
            </div>
            {/* Box-2 Content */}
            <div
              className={`flex flex-col space-y-4 overflow-y-auto ${latestNotification.length > 3 ? "h-72" : ""}`}
              style={{ scrollBehavior: "smooth" }}
            >
              {latestNotification.length > 0 ? (
                latestNotification.map((notify) => (
                  <div key={notify._id} className="bg-slate-200 w-full rounded-lg p-4">
                    <h1 className="text-gray-800 text-xl font-bold mb-1">{notify.title}</h1>
                    <p className="text-gray-600 text-sm">{notify.message}</p>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center">
                  <p className="text-gray-600 text-md align-middle">No latest notification</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <div className="w-3/4 h-96 bg-white rounded-2xl p-4">
            {/* Box-1 Header Content */}
            <div className="flex flex-row justify-between">
              <p className="text-2xl font-serif font-bold mb-3">Submitted assignments</p>
              <div className="flex flex-row justify-end align-middle space-x-2">
                <div className="relative">
                  <input
                    className="bg-slate-200 h-10 rounded-lg ps-3 pe-3 w-full"
                    type="text"
                    placeholder="Search by subject"
                    onChange={(e) => setFilteredSubmittedAssignment(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pb-1">
                    <Search className="text-gray-500" />
                  </div>
                </div>
                <div className="relative">
                  <select className="bg-slate-200 h-10 rounded-lg ps-3 pe-10 w-full appearance-none text-gray-700" onChange={(e) => {
                    setFilteredSubmittedAssignment(e.target.value)
                  }}>
                    <option value="">Select Subject</option>
                    {subject.map((subject) => {
                      return (
                        <option key={subject._id} value={subject.subjectName} className="text-gray-700">{subject.subjectName}</option>
                      )
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <ChevronDown className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Box-1 Content */}
            <table className="w-full mt-4">
              <thead className="">
                <tr className="text-gray-500">
                  <th className="text-left font-serif font-bold"></th>
                  <th className="text-left font-serif font-bold w-2/6">Assignment</th>
                  <th className="text-left font-serif font-bold">Submission Date</th>
                  <th className="text-left font-serif font-bold">Remarks</th>
                  <th className="text-right font-serif font-bold">Grade</th>
                </tr>
              </thead>
              <tbody className="">
                {submittedAssignmentsToShow
                  .filter((assignment) => {
                    const gradeDate = new Date(assignment.assignments.submissionDate);
                    const oneDayAgo = new Date();
                    gradeDate.setDate(gradeDate.getDate() + 1);
                    return oneDayAgo > gradeDate;
                  })
                  .map((assignment) => (
                    <tr key={assignment.assignmentDetails._id} className="align-middle h-16">
                      <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
                        {/* Icon or Image */}
                      </td>
                      <td>
                        <p className="font-serif font-bold">{assignment.assignmentDetails.subjectName}</p>
                        <p className="font-serif">{assignment.assignmentDetails.title}</p>
                      </td>
                      <td>
                        <p className="font-serif font-bold">{new Date(assignment.assignments.submissionDate).toLocaleDateString()}</p>
                      </td>
                      <td>
                        <p className="font-serif font-bold">{assignment.assignments.remarks}</p>
                      </td>
                      <td className="text-right">
                        <div className={`${getBackgroundColorClass(assignment.assignments.grade)}  text-white h-8 w-8 p-2 rounded-full inline-flex items-center justify-center`}>
                          <p className="font-serif font-bol">{assignment.assignments.grade}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                {/* Add more rows as needed */}
              </tbody>
            </table>
            {submittedAssignment.length > 3 && (
              <div
                className="mt-4 text-gray-500 px-4 py-2 rounded w-full text-center cursor-pointer flex justify-center items-center"
                onClick={handleViewMoreClickForSubmitted}
              >
                View More
              </div>
            )}
          </div>
          <div className="w-1/4 h-96 bg-white rounded-2xl p-4 bg-[url('/background.svg')] bg-cover bg-center">
            {/* Box-2 Content */}
          </div>
        </div>
      </div>

      {/* Pending Assignments Modal */}
      <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center modal-overlay modal-overlay ${isPendingModalOpen ? 'show' : ''}`}>
        <div className={`bg-white p-4 rounded-lg w-3/4 h-3/4 overflow-auto modal-content ${isPendingModalOpen ? 'show' : ''}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif font-bold">All Pending Assignments</h2>
            <button
              className="text-darkblue font-bold"
              onClick={() => setIsPendingModalOpen(false)}
            >
              <X />
            </button>
          </div>
          <table className="w-full mt-4">
            <thead className="">
              <tr className="text-gray-500">
                <th className="text-left font-serif font-bold"></th>
                <th className="text-left font-serif font-bold w-3/6">Assignment</th>
                <th className="text-left font-serif font-bold">Starting Date</th>
                <th className="text-left font-serif font-bold">Last Date</th>
                <th className="text-left font-serif font-bold"></th>
              </tr>
            </thead>
            <tbody className="">
              {pedningAssignment.map((assignment) => (
                <tr key={assignment._id} className="align-middle h-16">
                  <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
                    {/* Icon or Image */}
                  </td>
                  <td>
                    <p className="font-serif font-bold">{assignment.subjectName}</p>
                    <p className="font-serif">{assignment.title}</p>
                  </td>
                  <td>
                    <p className="font-serif font-bold">{new Date(assignment.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td>
                    <p className="font-serif font-bold">{new Date(assignment.deadline).toLocaleDateString()}</p>
                  </td>
                  <td className="text-right">
                    <div className="bg-blue text-white p-2 rounded-full inline-flex items-center justify-center">
                      <ListPlus />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* submittedAssignment model */}
      <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center modal-overlay modal-overlay ${isSubmittedModalOpen ? 'show' : ''}`}>
        <div className={`bg-white p-4 rounded-lg w-3/4 h-3/4 overflow-auto modal-content ${isSubmittedModalOpen ? 'show' : ''}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif font-bold">All Submitted Assignments</h2>
            <button
              className="text-darkblue font-bold"
              onClick={() => setIsSubmittedModalOpen(false)}
            >
              <X />
            </button>
          </div>
          <table className="w-full mt-4">
            <thead className="">
              <tr className="text-gray-500">
                <th className="text-left font-serif font-bold"></th>
                <th className="text-left font-serif font-bold w-2/6">Assignment</th>
                <th className="text-left font-serif font-bold">Submission Date</th>
                <th className="text-left font-serif font-bold">Remarks</th>
                <th className="text-right font-serif font-bold">Grade</th>
              </tr>
            </thead>
            <tbody className="">
              {submittedAssignment
                .filter((assignment) => {
                  const gradeDate = new Date(assignment.assignments.submissionDate);
                  const oneDayAgo = new Date();
                  gradeDate.setDate(gradeDate.getDate() + 1);
                  return oneDayAgo > gradeDate;
                })
                .map((assignment) => (
                  <tr key={assignment.assignmentDetails._id} className="align-middle h-16">
                    <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
                      {/* Icon or Image */}
                    </td>
                    <td>
                      <p className="font-serif font-bold">{assignment.assignmentDetails.subjectName}</p>
                      <p className="font-serif">{assignment.assignmentDetails.title}</p>
                    </td>
                    <td>
                      <p className="font-serif font-bold">{new Date(assignment.assignments.submissionDate).toLocaleDateString()}</p>
                    </td>
                    <td>
                      <p className="font-serif font-bold">{assignment.assignments.remarks}</p>
                    </td>
                    <td className="text-right">
                      <div className={`${getBackgroundColorClass(assignment.assignments.grade)}  text-white h-8 w-8 p-2 rounded-full inline-flex items-center justify-center`}>
                        <p className="font-serif font-bol">{assignment.assignments.grade}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center modal-overlay modal-overlay ${isNotificationModelOpen ? 'show' : ''}`}>
        <div className={`bg-white p-4 rounded-lg w-1/3 h-3/4 overflow-auto modal-content ${isNotificationModelOpen ? 'show' : ''}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif font-bold">All Notofications</h2>
            <button
              className="text-darkblue font-bold cursor-pointer"
              onClick={() => setIsNotificationModelOpen(false)}
            >
              <X />
            </button>
          </div>
          {/* Box-2 Content */}
          <div className="flex flex-col">
            {notification.map((notify) => (
              <div key={notify._id} className="bg-slate-200 w-full rounded-lg p-4 mb-4">
                <h1 className="text-gray-800 text-xl font-bold mb-1">{notify.title}</h1>
                <p className="text-gray-600 text-sm">{notify.message}</p>
              </div>
            ))}
            {/* <div className="h-10 bg-slate-200 w-full rounded-full flex justify-center items-center">
                <p className="text-gray-500">New Assingment of CN uploaded</p>
              </div> */}
          </div>
        </div>
      </div>


    </div >
  );
}
