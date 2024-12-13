//this is entry point of our application
import express from 'express';//this is will return a method
import dotEnv from 'dotenv';//dotenv packege return us a object
import { connectDb } from './config/dbConfig.js';
import authRouter from './routers/authRouter/authRouter.js';
import { globalErrorHandler } from './controllers/globalErrorHandler/globalErrorHandler.js';
dotEnv.config({path:'./config.env'});//this config method we will pass the path of env file  this is enble to use env variable on our appliction context
//in the config.env file whatever variable exits that will be save in the "env" property of the "process" object
const app=express();//we call the express method & it will return as a object
//this app ovject is have some property and the method which is to create express app  routePrefix
connectDb();

app.use(express.json());//in request we also receive the request body .that request body will be in json formate so we have to convert the json data to js object so we will use express.json() middleware
const routePrefix=process.env.API_PREFIX;
if(routePrefix){
app.use(`${routePrefix}/auth`,authRouter);
}else{
    app.use(`/auth`,authRouter);
}
//add the global error handler
app.use(globalErrorHandler)
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Listing to request on port no:${port}`)
})