import mongoose from "mongoose";
const connectDB=async ()=>{
    try{
        console.log(process.env.DEFAULT_MONGO_DSN,"connect")
        const conn=await mongoose.connect(process.env.DEFAULT_MONGO_DSN,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        // console.log(`mogodb connected:${conn.connection.host}`);
    }catch(error){
        console.log(`Error:${error.message}`);
        process.exit(1)
    }
}

export default connectDB;


