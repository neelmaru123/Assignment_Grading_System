'use client'

import { AlignJustify, Atom, Box, LayoutGrid, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Sidebar() {
    const router = useRouter()
    return (
        <>
        
            <div className="h-screen flex fixed top-0 left-0 flex-col justify-between bg-white w-28 text-black p-3 float-start items-center me-4">
                <div className="flex-shrink-0">
                    <Atom color="#05041F" size={36} />
                </div>
                <div className="flex-grow flex items-center">
                    <ul className="space-y-4">
                        <li>
                            <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-darkblue default:bg-darkblue" onClick={() => {
                                router.replace('/User')
                            }}>
                                <LayoutGrid color="#514DEC" />
                            </div>
                        </li>
                        <li>
                            <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-darkblue" onClick={() => {
                                router.replace('/User/Subjects')
                            }}>
                                <Box color="#514DEC" />
                            </div>
                        </li>
                        <li>
                            <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-darkblue">
                                <AlignJustify color="#514DEC" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center cursor-pointer justify-center hover:bg-darkblue">
                        <LogOut color="#514DEC" onClick={() => {
                            router.replace('/')
                        }}/>
                    </div>
                </div>
            </div>
        </>
    );
}
