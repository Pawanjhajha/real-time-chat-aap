//this is entry point of our application
import dotEnv from 'dotenv';//dotenv packege return us a object
dotEnv.config({path:'./config.env'});//this config method we will pass the path of env file  this is enble to use env variable on our appliction context
//in the config.env file whatever variable exits that will be save in the "env" property of the "process" object
import { app } from "./app.js";

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Listing to request on port no:${port}`)
})