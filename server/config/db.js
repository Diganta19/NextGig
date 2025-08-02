import mongoose from "mongoose";

//Function to connect to MongoDB Database

const connectDB = async()=>{
    // mongoose.connection.on('connected',()=>{
    //     console.log("Connected to DB");
        
    // })

 
        await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
        .then(console.log("connected"))
        .catch(err=>console.log(err.message));
        
        
    
    
    
    
}

export default connectDB;