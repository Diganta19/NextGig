import {v2 as cloudinary} from 'cloudinary';
import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import generateToken from '../utils/generateToken.js';
import Job from '../models/Job.js';

//Register a new Company
export const registerCompany = async (req,res)=>{
    const {name,email,password} = req.body;
    const imageFile = req.file;

    if(!name || !email || !password || !imageFile){
        return res.json({success:false, message:"Missing Details"});
    }
    try{
        const companyExist = await Company.findOne({email})
        if(companyExist){
            return res.json({success:false, message:"Company Already Exists"});
        }
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password,salt);

         const imageUpload = await cloudinary.uploader.upload(imageFile.path);

         const company = await Company.create({
            name,
            email,
            password:hashPassword,
            image: imageUpload.secure_url
         })

         res.json({
            success:true, 
            company:{
                _id:company._id,
                name:company.name,
                email: company.email,
                image:company.image
            },
            token:generateToken(company._id)    
         })
    }catch(err){
        res.json({success:false, message:err.message})
    }


}

//Company Login

export const loginCompany = async (req,res) =>{
    const {email,password} = req.body

    try {
        const company = await Company.findOne({email});

        if(bcrypt.compare(password, company.password)){
            res.json({
                success:true,
                company:{
                _id:company._id,
                name:company.name,
                email: company.email,
                image:company.image
                },
                token: generateToken(company._id)
            }
        )
        }else{
            res.json({success:false,message:"Invalid email or password"})
        }
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

//Get Company Data
export const getCompanyData = async(req,res)=>{

}

//Post a new Job
export const postJob = async(req,res)=>{

    const {title,description,location,salary,level,category} = req.body;

    const companyId = req.company._id

    // console.log(companyId,{title,description,location,salary});

    try{
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date:Date.now(),
            level,
            category
        })
        await newJob.save();
        res.json({success:true,newJob})
    }catch(error){
        res.json({success:false,message:error.message})
    }
    
}

//Get Company Job Applicants
export const getCompanyJobApplicants = async(req,res)=>{


}

//Get Compant Posted Jobs

export const getCompantPostedJobs = async(req,res)=>{

}

//Change Job Application Status

export const ChangeJobApplicationStatus = async(req,res)=>{

}

//change job visibility
export const changeVisibility = async(req,res) =>{

}