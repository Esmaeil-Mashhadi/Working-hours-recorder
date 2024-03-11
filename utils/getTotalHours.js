const { default: userModel } = require("@/models/user")
const { calculateTotalWork } = require("./calculateTotalWork")
const { default: connectToDataBase } = require("@/config/db.connection")

const getTotalHours = async()=>{
    await connectToDataBase()
 const data = await userModel.find({} , {tasks : 1 , name: 1 , _id:0})

 const Esmaeil = data.find(item => item.name == "esi2022")
 const Mojtaba = data.find(item => item.name == "moji3880")


const MojiTotalWork = calculateTotalWork(Mojtaba?.tasks)
const EsiTotalWork = calculateTotalWork(Esmaeil?.tasks)

console.log(EsiTotalWork);
 return {MojiTotalWork , EsiTotalWork}
} 


module.exports = {
    getTotalHours
}