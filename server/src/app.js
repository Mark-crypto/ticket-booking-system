import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"

dotenv.config();


export const app = express();
const allowedOrigins = [
process.env.FRONTEND_URL,
process.env.DEV_URL
]

//middlewares
app.use(express.json());
app.use(cors({
    origin:(origin, callback)=>{
        if(!origin){
           return callback(null, true);
        }
        if(allowedOrigins.includes(origin)){
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS."))
    },
    credentials: true,
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders:["Content-Type", "Authorization"]
}));
app.use(helmet());
app.use(morgan("dev"));


//entry route
app.get("/", (req,res)=>{
    console.log("This is the main page");
    res.send("Hello world")
})

app.use((req,res)=>{
    res.status(404).json({
        message:"Route not found"
    })
});
app.use((err,req,res,next)=>{
    console.error(err);

    res.status(500).json({
        message:"Internal server error"
    })
});