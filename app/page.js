import styles from './page.module.css'
import TaskSquare from './components/TaskSquare';
import { getTotalHours } from '@/utils/getTotalHours';
import Form from './components/modules/Form';
import {cookies } from 'next/headers'
import jwt from "jsonwebtoken"

const MainPage = async() => {

  
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
  const {MojiTotalWork , EsiTotalWork} = await getTotalHours()

  const exitHandler = async()=>{
    'use server'
    cookies().delete("authorization")
  }
  return (
    <div className ={styles.container}>
    <h1>ساعات کار روی وبسایت بوس بوس </h1>
    {!permission &&
      <div className={styles.Form}> 
      <Form />
     </div>
    }

      <TaskSquare MojiTotalWork ={MojiTotalWork}  EsiTotalWork ={EsiTotalWork} exitHandler = {exitHandler} name ={name} />
    </div>
  );
};

export default MainPage;
