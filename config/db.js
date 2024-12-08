const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async()=>{
     try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`connected to mongodb ${mongoose.connection.host}`.bgGreen.white)
     }
     catch{
        console.log(`error in connecting with DB ${error}`.bgRed.white)
     }
}
module.exports = connectDB;