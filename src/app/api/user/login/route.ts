import { connectDB } from "@/DB/dbConnection";
import User from "@/models/UserModels";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

connectDB()

export async function POST(req:NextRequest){
    try {

        const {email,password} = await req.json()

        console.log('body',email,password)

        // check the user---------

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }


        // check the password-------

        const validPass = await bcrypt.compare(password,user.password)

        if(!validPass){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        //create token------------

        const tokenData = {
            id:user._id,
            username : user.username
        }

        const token = await jwt.sign(tokenData,process.env.ACCESS_TOKEN_SECRET! ,{expiresIn:"1d"})

        //send the response----------

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token",token,{httpOnly:true})

        return response
        
    } catch (error:any) {

        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}