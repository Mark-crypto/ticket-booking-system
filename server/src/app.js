import express from "express"


export const app = express();

//middlewares
app.use(express.json());


//entry route
app.get("/", (req,res)=>{
    console.log("This is the main page");
    res.send("Hello world")
})