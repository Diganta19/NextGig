import express from "express";
import { ChangeJobApplicationStatus, changeVisibility, getCompantPostedJobs, getCompanyData, getCompanyJobApplicants, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

//Register a Company
router.post('/register',upload.single("image"),registerCompany);

//Login in as a Company
router.post('/login',loginCompany);

//Get Company Data
router.get('/company',protectCompany,getCompanyData);

router.post('/post-job',protectCompany,postJob);

//Get Applicants for a Job
router.get('/applicants',protectCompany,getCompanyJobApplicants);

//Get Company posted Jobs
router.get('/list-jobs',protectCompany,getCompantPostedJobs);


//Change Application Status
router.post('/change-status',protectCompany,ChangeJobApplicationStatus);


//Change Application Visibility
router.post('change-visibility',protectCompany,changeVisibility);

export default router;