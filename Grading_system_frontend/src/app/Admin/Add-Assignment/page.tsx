'use client'

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function AddAssignment() {
    const router = useRouter()
    const [subject, setSubject] = useState([])
    const [semester, setSemester] = useState([])
    const [assignment, setAssignment] = useState<any>({})
    const facultyId = localStorage.getItem("facultyId")

    useEffect(() => {
        // Get all subject teached by the faculty
        fetch("http://localhost:5000/subjects/getSubjectByFaculty/" + facultyId)
            .then(res => res.json())
            .then(data => setSubject(data))

        // Get all sem in which faculty go to teach
        fetch("http://localhost:5000/semesters/getSemesterByFaculty/" + facultyId)
            .then(res => res.json())
            .then(data => setSemester(data))
    }, [])

    // Add new assignment 
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Handle Submit called ");

        // Create a new assignment object that includes the facultyId
        const updatedAssignment = { ...assignment, facultyId: facultyId };
        // console.log(updatedAssignment);
        
        fetch("http://localhost:5000/assignments/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAssignment),
        })
            .then((res) => {
                console.log(res);
            });
    }

    return (
        <div className="ml-40 h-screen w-auto text-black p-4">
            <div className="flex justify-between items-center mb-8">
                <ArrowLeft className="text-3xl cursor-pointer" onClick={() => { router.replace('/Admin') }} />
                <h1 className="text-3xl font-semibold">Add Assignment</h1>
                <div className="w-8"></div> {/* Empty div to balance the layout */}
            </div>
            <div className="bg-white shadow-2xl rounded-lg p-6 max-w-2xl mx-auto">
                <form className="space-y-4">
                    <div>
                        <label className="block  text-gray-700">Title of the assignment</label>
                        <input
                            type="text"
                            id="name"
                            required
                            onChange={(e: any) => setAssignment({ ...assignment, title: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter Title of the assignment"
                        />
                    </div>

                    <div>
                        <label className="block  text-gray-700">Description</label>
                        <textarea
                            onChange={(e: any) => setAssignment({ ...assignment, description: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter Description"
                            required
                        />
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700">Last Date</label>
                            <input
                                type="date"
                                id="date"
                                required
                                onChange={(e: any) => setAssignment({ ...assignment, deadline: e.target.value })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter Last Date of submission"
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="block text-gray-700">Semester</label>
                            <select
                                id="address"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onChange={(e: any) => setAssignment({ ...assignment, semesterId: e.target.value })}
                            >
                                <option>Choose Semester</option>
                                {semester.map((sem: any) => (
                                    <option key={sem._id} value={sem._id}>{sem.semesterName}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-3/4">
                            <label className="block text-gray-700">Subject</label>
                            <select

                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onChange={(e: any) => setAssignment({ ...assignment, subjectId: JSON.parse(e.target.value)._id, subjectName: JSON.parse(e.target.value).subjectName })}
                            >
                                <option>Choose Subject</option>
                                {subject.map((sub: any) => (
                                    <option key={sub._id} value={JSON.stringify({ _id: sub._id, subjectName: sub.subjectName })}>{sub.subjectName}</option>
                                ))}

                            </select>
                        </div>

                        <div className="w-1/4">
                            <label className="block text-gray-700">Demo File</label>
                            <input
                                type="date"
                                id="date"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter Demo File"
                            />
                        </div>
                    </div>



                    <div className="flex justify-end space-x-4">
                        <button
                            type="reset"
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md  focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 bg-blue text-white rounded-md  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
                {/* </div> */}

            </div>
        </div>
    )
}

export default AddAssignment