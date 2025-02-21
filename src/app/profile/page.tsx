"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function page() {
const router = useRouter()
const [user, setuser] = useState<any> ({})

    const handleLogout = async()=>{

        try {

            const res = await axios.get("/api/user/logout")

            console.log("respose",res)
            
            router.push("/login")
        } catch (error) {

            console.log("error",error)
            
        }

    }

    const getUser = async()=>{

        try {

            const res = await axios.get("/api/user/profile")

            setuser(res.data.user)
            
        } catch (error) {

            console.log("error",error)
            
        }
    }

    useEffect(()=>{

        getUser()

    },[])


  return (
    <div className="flex h-screen items-center justify-center" >
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ">
         
            <div className="flex flex-col items-center py-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
                
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user?.username}</h5>

                <span className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</span>

                <div className="flex mt-4 md:mt-6">
                    <button onClick={handleLogout} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Logout
                    </button>
                   
                </div>
            </div>
        </div>
    </div>
  )
}
