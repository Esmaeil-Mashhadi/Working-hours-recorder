const { default: mongoose } = require("mongoose")

const connectToDataBase = async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to data base');
}

export default connectToDataBase

