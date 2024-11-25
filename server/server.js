import { app } from "./app.js";
//this is entry point of our application

const port=3000;
app.listen(port,()=>{
    console.log(`Listing to request on port no:${port}`)
})