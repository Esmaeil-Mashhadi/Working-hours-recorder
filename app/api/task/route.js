import connectToDataBase from "@/config/db.connection";
import userModel from "@/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req){
    await connectToDataBase() 
    const token = await req.headers.get("cookie").split('=')[1]
    const {name} = jwt.verify(token , process.env.SECRET)
    const {hour , date}= await req.json()
    const task = await userModel.updateOne({name} , {$push:{tasks:{hour , date}}})
    if(!task) return NextResponse.error('هنگ کرد سرور :(')
    return NextResponse.json({status:201 , message:"ساعت کاری ذخیره شد"})
}