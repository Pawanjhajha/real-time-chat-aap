import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        required:false,
    }

},{timestamps:true});
//create the indexing on the email 
userSchema.index({ email: 1 }, { unique: true });

//schema basically tell what property we need to create the user object
export const userModel=mongoose.model('core_users',userSchema);//it will take two perameter and 1.model name 2.userScheam
//a model is like the blue print based on that mongoose create the document.mongodb create take model for create the document