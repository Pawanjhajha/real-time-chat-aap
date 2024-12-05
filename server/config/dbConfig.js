import mongoose from "mongoose"

export const connectDb=async()=>{
    try{
        console.log("connect mongodb"+process.env.MONGODB_URI);
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        //mongoose is the object wich have the connect method 
    }catch(error){
        console.log(`Error:${error.messages}`)
        process.exit(1)
    }
}