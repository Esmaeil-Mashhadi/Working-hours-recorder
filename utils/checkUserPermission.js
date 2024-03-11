import {cookies } from 'next/headers'
import jwt from "jsonwebtoken"

export const checkUserPermission = ()=>{
    try {
        let permission = false
        let name = ""
        const token = cookies().get("authorization")?.value 
        let result
        if(token){
           result = jwt.verify(token ,"ENHm8WeMP1" )
           permission = result?.name
          if(permission == "esi2022"){
            name = "اسماعیل"
          }else{
            name = "مجتبی"
          }
        }
        return {name , permission , token}
    } catch (error) {
        return {permission : false}
    }

}