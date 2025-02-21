"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function page() {
    const [disbled, setdisbled] = useState(false)
    const [loading, setloading] = useState(false)
    const [token, setToken] = useState("")

    const router = useRouter()

    const [formData, setForm] = useState({
        password:"",
        confirmpassword:""
    })


    const HandleSubmit = async ()=>{

      console.log("click")

      const payload = {
        password:formData.confirmpassword,
        token:token
      }

        try {
            setloading(true)

            const res = await axios.post("/api/user/updatepass",payload)

            console.log("response",res.data)

            router.push("/login")

            
        } catch (error) {
            console.log("error",error)
        }finally{
            setloading(false)
        }

    }

    useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "");
    }, [])

    console.log("token",token)

    useEffect(() => {

      if(formData.confirmpassword.length){
        if(formData.confirmpassword === formData.password){
          setdisbled(false)
        }else{
            setdisbled(true)
        }
      }else{
        setdisbled(false)
      }
      
    }, [formData.confirmpassword])


  return (
    <div className="h-[90vh] flex items-center justify-center" >
        <div className="w-80 rounded-2xl bg-slate-900">
          <div className="flex flex-col gap-4 p-8">
          <p className="text-center text-3xl text-gray-300 mb-4">{loading ?"Sending..":"Forget Password"}</p>
        
          <p className="text-center text-gray-300 mb-4" >{disbled ? "Password and confirmpassword should be same" : ""}</p>
            <input
              className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
              placeholder="password"
              type="password"
              value={formData.password}
              onChange={(e)=>setForm({...formData,password:e.target.value})}
            />

            <input
              className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
              placeholder="confirmpassword"
              type="password"
              value={formData.confirmpassword}
              onChange={(e)=>setForm({...formData,confirmpassword:e.target.value})}
            />
            
            <button className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
            onClick={HandleSubmit}
            >
              Reset
            </button>
          </div>
        </div>
    </div>
  );
}
