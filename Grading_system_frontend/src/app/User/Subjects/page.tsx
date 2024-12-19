'use client'

import Image from "next/image";
import { useEffect, useState } from "react"



export default function Subjects() {
  const studentId = localStorage.getItem('studentId');
  const [state, setState] = useState<{
    subject: [],
    student: {
      semester: string
    }
  }>({
    subject: [],
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
      fetch("http://localhost:5000/semesters/getSemesterById/" + state.student.semester)
        .then((res) => res.json())
        .then((data) => setState((prev) => ({ ...prev, subject: data.subjects })))
    }
  }, [state.student])

  return (
    <div className="ml-28 h-screen w-auto text-black p-4">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-semibold ">Subjects</h1>
      </div>
      <div className="flex flex-wrap mt-5 -mx-3">
        {state.subject.map((subject: any) => (
          <div className="relative h-60 w-96 mx-3 mb-6  transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer" key={subject.subjectId}>
            <div className="h-3/4 w-auto rounded-b-lg overflow-hidden">
              <Image
                src="https://wallpaperaccess.com/full/1704529.jpg"
                alt="subject"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="absolute h-1/4 w-full bg-blue rounded-b-lg flex items-center justify-center">
              <p className="text-lg text-white">{subject.subjectName}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}