import styles from './page.module.css'
import TaskSquare from './components/TaskSquare';
import { getTotalHours } from '@/utils/getTotalHours';
import Form from './components/modules/Form';
import { checkUserPermission } from '@/utils/checkUserPermission';
import { cookies } from 'next/headers';

const MainPage = async() => {

  
  const {name, permission} = checkUserPermission()
  console.log(name);
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
