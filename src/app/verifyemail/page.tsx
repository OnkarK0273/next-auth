"use client"
import axios from "axios"
import { useEffect, useState } from "react"

export default function page() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(true)

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    console.log("token",token)

    const verifyUserEmail = async () =>{

        try {
            
            const res = await axios.post("/api/user/verifyemail", {token})
            
            console.log("res",res)
            setVerified(true)
            setError(false)
            
        } catch (error) {

            console.log("error",error)
            setVerified(false)
            setError(true)
            
        }

    }
    
    useEffect(()=>{
        if(token.length > 0) {
            verifyUserEmail();
        }
    },[token])

  return (
    <div className="h-[90vh] flex items-center justify-center" >
        
        {
            verified && <div className="flex flex-col items-center gap-4 p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
            <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium mr-2">Verify Successsfully</span> 
                
                Token: {token}
                
            </div>
            </div>
        }

        {
            error && <div className="flex flex-col gap-4 items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Error 404</span> Change a few things up and try submitting again.
            </div>
          </div>
        }
        

    </div>
  )
}
