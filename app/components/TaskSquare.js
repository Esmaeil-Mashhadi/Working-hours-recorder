'use client'
import styles from './taskSquare.module.css'
import {  useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useRouter } from 'next/navigation';



const TaskSquare = ({name , exitHandler , MojiTotalWork , EsiTotalWork}) => {


    const [refresh , setRefresh] = useState(false)
    const [date , setDate] = useState(new Date().toLocaleDateString("fa-IR"))
    const [hour , setHour] = useState("00:00")
    const totalTeamHours = MojiTotalWork.hours + EsiTotalWork.hours
    const router = useRouter()
  
    const submitHandler = async()=>{  
      if(!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(hour)){
        toast.error('فرمت ساعت درست نیست')
      }else{

        const res = await fetch("api/task" , {
          method:"POST" , body:JSON.stringify({hour , date}) , headers :{"Content-Type" :"application/json"}
        })
        const data = await res.json()
        if(data.status == 201){
          setRefresh(!refresh)
          router.refresh()
          toast.success(data.message)
        }
      }
    }


    const changeHandler = (e)=>{
      const persianDate = new Date(e).toLocaleDateString("fa-IR")
      setDate(persianDate)      
    }

    const changeValueHandler =(e)=>{
      if(/^\d+(:\d+)*$/.test(e.target.value)){
        setHour(e.target.value)
      }
      
    }


 const handleExitAndRefresh = ()=>{
  exitHandler()
  router.refresh()
 }


    return (
        <div  className={styles.buttonsContainer}>
            <div className={styles.date}>
                <h5>کاربر : {name}</h5>
                <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={date}
                onChange={changeHandler}
                calendarPosition="bottom-right"
              />  
            </div>
            <div className={styles.inputContainer}>
              <label> ساعات کاری امروز: </label>
              <input type='text' value={hour} step={.5} onChange={changeValueHandler} />
              <button onClick={()=>setHour("00:00")} >صفرش کن</button>

            </div>
            <div className={styles.submitContainer}>
              <button className={styles.submit} onClick={submitHandler}>ثبت</button>
               <button className={styles.exit} onClick={handleExitAndRefresh}>خروج</button>
            </div>

            <div className={styles.shareContainer}>
               <div className={styles.workContainer}>
                  <div className={styles.hourContainer}>
                       <label> ساعات اسماعیل :{EsiTotalWork.minutes} : {EsiTotalWork.hours} </label>
                       <label> ساعات مجتبی :{MojiTotalWork.minutes} : {MojiTotalWork.hours} </label>
                  </div>
                <span style={{'--percent': `${(EsiTotalWork.hours/totalTeamHours)*100}%`}} className={styles.rangeStyle}></span>
                <div className={styles.percentContainer}>
                  <label> درصد اسماعیل : {Math.round((EsiTotalWork.hours / totalTeamHours)*100)}% </label>
                  <label> {Math.round((MojiTotalWork.hours/(totalTeamHours))*100)}% : درصد مجتبی </label>
               </div>
                
               </div>
            </div>
            <Toaster />
         </div>

    );
};

export default TaskSquare;

