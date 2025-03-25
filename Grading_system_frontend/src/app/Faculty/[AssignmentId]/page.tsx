'use client'
import { ArrowLeft, Bell, Search, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';


export default function AssignmentById() {
    const router = useRouter();
    const facultyId = localStorage.getItem("facultyId");
    const { AssignmentId } = useParams();
    const [assignment, setAssignment] = useState({});
    const URL = "http://localhost:5000";
    const [state, setState] = useState<{
        pendingStudents: any;
        submitedStudents: any;
        pendingShowMore: boolean;
        submitedShowMore: boolean;
        isModalOpen: boolean;
        filterPendingStudents: String;
        filterSubmittedStudents: String;
        graphData: { pendingStudents: number, totalStudents: number, title: string, subjectName: string };
    }>({
        pendingStudents: [],
        pendingShowMore: false,
        submitedShowMore: false,
        isModalOpen: false,
        submitedStudents: [],
        filterPendingStudents: "",
        filterSubmittedStudents: "",
        graphData: { pendingStudents: 0, totalStudents: 0, title: "", subjectName: "" }
    });

    useEffect(() => {
        fetch(URL + "/assignments/" + AssignmentId)
            .then((res) => res.json())
            .then((data) => setAssignment(data))
    }, [])

    useEffect(() => {

        fetch(URL + "/assignments/pendingStudents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: AssignmentId })
        })
            .then((res) => res.json())
            .then((data) => setState((prevState) => ({ ...prevState, pendingStudents: data })))

        fetch("http://localhost:5000/assignments/submittedStudents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: AssignmentId })
        })
            .then((res) => res.json())
            .then((data) => setState((prevState) => ({ ...prevState, submitedStudents: data })))
    })

    const handleViewMoreClick = () => {
        setState((prevState) => ({ ...prevState, showMore: true }))
        setState((prevState) => ({ ...prevState, isModalOpen: true }))
    };

    const filteredPendingStudent = state.pendingStudents ? state.pendingStudents.filter((data: any) => data.name.toLowerCase().includes(state.filterPendingStudents.toLowerCase())) : []

    return (
        <>

            <div className="ml-28 h-screen w-auto text-black p-4">
                <div className='flex flex-row justify-between'>
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center float-start cursor-pointer" onClick={() => router.replace("/Faculty")}>
                        <ArrowLeft color="#05041F" className="cursor-pointer" />
                    </div>
                    <div>
                        <div className="float-end bg-darkblue h-14 rounded-full text-white font-semibold flex items-center justify-center p-5 ms-3 cursor-pointer" onClick={() => {
                            router.replace('/Faculty/Add-Assignment')
                        }}>
                            Edit Details
                        </div>
                    </div>
                </div>
                <div className="mt-4 w-full h-auto float-start bg-gray-300 rounded-2xl p-4 mb-4">
                    <div className="flex space-x-3 mb-3">
                        <div className="w-3/4 h-auto min-h-96 bg-white rounded-2xl p-4">
                            <p className="text-2xl font-serif font-bold mb-3 float-start">Pending Students </p>
                            <div className="flex flex-row justify-end align-middle space-x-2">
                                <div className="relative">
                                    <input
                                        className="bg-slate-200 h-10 rounded-lg ps-3 pe-3 w-full"
                                        type="text"
                                        placeholder="Search by Name"
                                        onChange={(e) => setState((prevState) => ({ ...prevState, filteredData: e.target.value }))}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pb-1">
                                        <Search className="text-gray-500" />
                                    </div>
                                </div>
                            </div>
                            <table className="w-full mt-4">
                                <thead className="">
                                    <tr className="text-gray-500">
                                        <th className="text-left font-serif font-bold"></th>
                                        <th className="text-left font-serif font-bold ">Name</th>
                                        <th className="text-left font-serif font-bold">Submission Date</th>
                                        <th className="text-left font-serif font-bold">Grade</th>
                                        <th className="text-left font-serif font-bold w-2/6">Remarks</th>
                                        <th className='className="text-left font-serif font-bold'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPendingStudent.map((student: any) => (
                                        <tr key={student._id} className="align-middle h-16">
                                            <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
                                                {/* Icon or Image */}
                                            </td>
                                            <td>
                                                <p className="font-serif font-bold">{student.name}</p>
                                            </td>
                                            <td>
                                                <p className="font-serif font-bold">{new Date(student.assignments[0].submissionDate).toLocaleDateString()}</p>
                                            </td>
                                            <td>
                                                <p className="font-serif font-bold">{student.assignments[0].grade}</p>
                                            </td>
                                            <td className="text-left">
                                                <p className="font-serif font-bold">{student.assignments[0].remarks}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {(
                                <div
                                    className="mt-4 text-gray-500 px-4 py-2 rounded w-full text-center cursor-pointer flex justify-center items-center"
                                    onClick={handleViewMoreClick}
                                >
                                    View More
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* View Pending Student Modal */}
            <div className={`fixed inset-0 bg-gray-600 shadow-2xl shadow-darkblue bg-opacity-50 flex items-center justify-center modal-overlay modal-overlay ${state.isModalOpen ? 'show' : ''}`}>
                <div className={`bg-white p-4 rounded-lg w-3/4 h-3/4 overflow-auto text-black modal-content ${state.isModalOpen ? 'show' : ''}`}>
                    <div className="flex justify-between items-center mb-4">
                    <div className="flex justify-start space-x-5">
                            <div className={`text-2xl font-serif font-bold cursor-pointer`} >Pending Students</div>     
                        </div>
                        <div className="relative">
                            <input
                                className="bg-slate-200 h-10 rounded-lg ps-3 pe-3 w-full"
                                type="text"
                                placeholder="Search by Student"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pb-1">
                                <Search className="text-gray-500" />
                            </div>
                        </div>
                        <button
                            className="text-darkblue font-bold"
                            onClick={() => setState((prevState) => ({ ...prevState, isModalOpen: false }))}
                        >
                            <X />
                        </button>
                    </div>

                    <table className="w-full mt-4">
                        <thead className="">
                            <tr className="text-gray-500">
                                <th className="text-left font-serif font-bold"></th>
                                <th className="text-left font-serif font-bold ">Name</th>
                                <th className="text-left font-serif font-bold">Submission Date</th>
                                <th className="text-left font-serif font-bold">Grade</th>
                                <th className="text-left font-serif font-bold w-2/6">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {filteredPendingStudent.map((student: any) => (
                                <tr key={student._id} className="align-middle h-16">
                                    <td className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center me-2">
                                        {/* Icon or Image */}
                                    </td>
                                    <td>
                                        <p className="font-serif font-bold">{student.name}</p>
                                    </td>
                                    {/* <td>
                                        <p className="font-serif font-bold">{new Date(student.assignments[0].submissionDate).toLocaleDateString()}</p>
                                    </td> */}
                                    <td>
                                        <p className="font-serif font-bold">{student.assignments[0].grade}</p>
                                    </td>
                                    <td className="text-left">
                                        <p className="font-serif font-bold">{student.assignments[0].remarks}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}