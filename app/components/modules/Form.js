'use client'
import { useState } from 'react';
import styles from './Form.module.css'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
const Form = () => {
    const [data , setData] = useState({
        name:"", password:""
    })
    const changeHandler = (e)=>{
        setData({
          ...data ,  [e.target.name] : e.target.value
        })
    }

    const router = useRouter()

    const submitHandler =  async()=>{
        const res = await fetch("/api/auth", {
            method:"POST" , body:JSON.stringify(data) , headers:{"Content-Type":"application/json"}
        })
        const result = await res.json()
        console.log(result);
        if(result.status == 'success'){
            router.refresh()
            toast.success('خوش اومدی')
        }else{
            toast.error(result.error)
        }
    }

    return (
        <div className={styles.container}>
                <div className={styles.name}>
                    <label>نام  : </label>
                    <input name='name' onChange={changeHandler}/>
                </div>

                <div className={styles.password}>
                    <label>رمز عبور : </label>
                    <input onChange={changeHandler} name='password' />
                </div>

                <button onClick={submitHandler}>
                        ورود
                </button>
                <Toaster />
        </div>
    );
};

export default Form;