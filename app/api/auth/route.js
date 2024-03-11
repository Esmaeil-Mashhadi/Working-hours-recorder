import connectToDataBase from "@/config/db.connection";
import userModel from "@/models/user";
import { compare, hash } from "bcrypt";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(req){
    try {
        await connectToDataBase()
        const {name , password} = await req.json()

        const checkUser = await userModel.findOne({name})
        if(checkUser){
             const checkPassword =  compare(checkUser.password , password)
             if(checkPassword){
                const token = jwt.sign({name} ,process.env.SECRET , {expiresIn:"1y"})
                const response = NextResponse.json({status:'success'} , {status:201})
                response.cookies.set({
                   name:'authorization', 
                   value : token,
                   maxAge : 1000*60*60*24*360
                })
                return response
             }
      
        }

        const allowedUsers = ['esi2022' ,'moji3880' ]
        if(!allowedUsers.includes(name)){
            return NextResponse.json({error:"شما اجازه دسترسی ندارید"})
        }
        const hashedPassword = await hash(password , 10)
         const result = await userModel.create({name , password: hashedPassword})

         if(result){
             const token = jwt.sign({name} ,process.env.SECRET , {expiresIn:"1y"})
            
             const response = NextResponse.json({status:'success'} , {status:201})
             response.cookies.set({
                name:'authorization', 
                value : token,
                maxAge : 1000*60*60*24*360
             })

             return response
         }else{
            return NextResponse.json({error:"مشکلی پیش آمد"})
         }

    } catch (error) {
        console.log(error);
        return NextResponse.json({message:error.message || 'internal server error'} , {status:500})
    }
}