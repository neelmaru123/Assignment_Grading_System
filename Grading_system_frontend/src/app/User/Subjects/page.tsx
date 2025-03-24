'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Subjects() {
  const studentId = localStorage.getItem('studentId');
  const router = useRouter();
  const [state, setState] = useState<{
    subject: [
      {
        subjectId: string,
        subjectName: string
      }
    ],
    student: {
      semester: string
    }
  }>({
    subject: [
      {
        subjectId: "",
        subjectName: ""
      }
    ],
    student: {
      semester: ""
    }
  })

  useEffect(() => {
    fetch("http://localhost:5000/students/" + studentId)
      .then((response) => response.json())
      .then((data) => setState((prev) => ({ ...prev, student: data })))
  }, [])

  useEffect(() => {
    if (state.student && state.student.semester) {
      fetch("http://localhost:5000/subjects/getSubjectBySemester/" + state.student.semester)
        .then((res) => res.json())
        .then((data) => setState((prev) => ({ ...prev, subject: data })))
    }
  }, [state.student])

  return (
    <div className="ml-28 h-screen w-auto text-black p-4">
      <div className="mt-4 w-full h-auto float-start bg-gray-300 rounded-2xl p-4 mb-4">
        <div className="w-full h-auto min-h-96 bg-white rounded-2xl p-4">
          <div className="flex items-center justify-center rounded-t-2xl">
            <h1 className="text-3xl font-semibold">Subjects</h1>
          </div>
          <div className="flex flex-wrap justify-evenly">
            {state.subject.map((subject: any) => (
              <div className="h-60 w-80 mx-3 mb-6 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer" key={subject._id} onClick={() => {
                router.replace("/User/Subjects/" + subject._id)
              }}>
                <div className="h-3/4 w-auto overflow-hidden">
                  <Image
                    src="https://wallpaperaccess.com/full/1704529.jpg"
                    alt="subject"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="absolute h-1/4 w-full bg-blue flex items-center justify-center">
                  <p className="text-lg text-white">{subject.subjectName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}