export const calculateTotalWork = (tasks)=>{

    const hours = []
    const minutes = []
    tasks?.forEach(item => {
       const [h , m] = item.hour.split(':')
       hours.push(h) 
       minutes.push(m)
     })
   
    const hourSum = hours.reduce((acc , curr)=>{
        if(curr.startsWith('0')){
           let num = parseInt(curr)
           return  num += acc
        }else{
           let num = parseInt(curr)
           return num +=acc
        }
     },0)
   
   
     const minuteSum = minutes.reduce((acc , curr)=>{
         if(curr.startsWith('0')){
           let num = parseInt(curr)
           return num += acc
         }else{
           let num = parseInt(curr)
           return num += acc
         }
     },0)
   
   
     let totalWork ={
       hours: null,
       minutes: null,
     }
   
   
     if(minuteSum >= 60){
        const [h] = JSON.stringify(minuteSum/60)
       totalWork.hours = +h + hourSum 
       totalWork.minutes = minuteSum%60
     }else{
       totalWork.hours = hourSum
       totalWork.minutes = minuteSum%60
     }
   return totalWork
}