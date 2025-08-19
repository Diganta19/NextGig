import express from 'express';
import './config/instrument.js'
import cors from "cors";
import "dotenv/config";
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import {clerkWebhooks} from "./controllers/webhooks.js"
import bodyParser from 'body-parser' 
import companyRouter from "./routes/companyRoutes.js";   
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from '../server/routes/jobRoutes.js'

//Initialize Express
const app = express()
//Connect to DB

async function startServer() {
    await connectDB();
    await connectCloudinary();


//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get("/",(req,res)=>res.send('API Working'));
app.get('/debug-sentry',function mainHandler(req,res){
    throw new Error("Sentry Error");
})
app.post("/webhooks",bodyParser.raw({type:'application/json'}),clerkWebhooks)
app.use("/api/company",companyRouter);
app.use("/api/jobs",jobRoutes);




//Port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
}
startServer()