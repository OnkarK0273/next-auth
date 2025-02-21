"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function page() {
    const [disbled, setdisbled] = useState(true)
    const [loading, setloading] = useState(false)
    const router = useRouter()

    const [formData, setForm] = useState({
        email:"",
        password:""
    })


    const HandleSubmit = async ()=>{

        try {
            setloading(true)

            const res = await axios.post("/api/user/login",formData)

            console.log("response",res.data)

            router.push("/")

            
        } catch (error) {
            console.log("error",error)
        }finally{
            setloading(false)
        }

    }

    useEffect(() => {
    
        if(formData.email.length && formData.password.length){
            setdisbled(false)
        }else{
            setdisbled(true)
        }
          
    }, [formData])


  return (
    <div className="h-[90vh] flex items-center justify-center" >
        <div className="w-80 rounded-2xl bg-slate-900">
          <div className="flex flex-col gap-4 p-8">
          <p className="text-center text-3xl text-gray-300 mb-4">{loading ?"Sending..":"Login"}</p>
        
            <input
              className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
              placeholder="email"
              type="email"
              value={formData.email}
              onChange={(e)=>setForm({...formData,email:e.target.value})}
            />
            <input
              className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
              placeholder="password"
              type="password"
              value={formData.password}
              onChange={(e)=>setForm({...formData,password:e.target.value})}
            />
            <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400">
                <Link href={"/signup"} >Create Account</Link>
                <Link href={"/forgotpassword"} >forgot password</Link>
            </label>
            <button className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
            
            onClick={HandleSubmit}
            >
              {disbled ? "Fill the form" : "Login"}
            </button>
          </div>
        </div>
    </div>
  );
}
