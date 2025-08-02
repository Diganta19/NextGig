import express from "express";
import { ChangeJobApplicationStatus, changeVisibility, getCompantPostedJobs, getCompanyData, getCompanyJobApplicants, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import upload from "../config/multer.js";

const router = express.Router();

//Register a Company
router.post('/register',upload.single("image"),registerCompany);

//Login in as a Company
router.post('/login',loginCompany);

//Get Company Data
router.get('/company',getCompanyData);

router.post('/post-job',postJob);

//Get Applicants for a Job
router.get('/applicants',getCompanyJobApplicants);

//Get Company posted Jobs
router.get('/list-jobs',getCompantPostedJobs);


//Change Application Status
router.post('/change-status',ChangeJobApplicationStatus);


//Change Application Visibility
router.post('change-visibility',changeVisibility);

export default router;