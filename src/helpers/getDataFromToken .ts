import  Jwt  from "jsonwebtoken";
import { NextRequest } from "next/server";


export const getDataFromToken = (req : NextRequest)=>{

    try {

        const token = req.cookies.get("token")?.value || ""

        const decodedToken:any = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)

        return decodedToken.id


        
    } catch (error:any) {
        throw new Error(error.message);
    }
}