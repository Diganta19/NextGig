/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from "moment";
import {data, useNavigate} from "react-router-dom"
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import Loading from '../components/Loading'
import { toast } from 'react-toastify';

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs,setJobs] = useState(false);

  //Funciton to fetch company job application data
  const {backendUrl,companyToken} = useContext(AppContext)

  const fetchCompanyJobs = async()=>{
    try {
      const {data} = await axios.get(backendUrl+'/api/company/list-jobs',
        {headers:{token:companyToken}}
      )

      if(data.success){
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData);
       
        
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(companyToken){
      fetchCompanyJobs();
    }
  },[companyToken])

  //Visibility toggle funtion
  const changeJobVisibility = async(id)=>{
    try {
      const {data} = await axios.post(backendUrl + '/api/company/change-visibility',
        {id},
        {headers:{token:companyToken}}
      )

      if(data.success){
        toast.success(data.message)
        fetchCompanyJobs();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return jobs ? jobs.length===0? (
  <div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl'>No Jobs Avliable or Posted</p>
  </div>) : (
    <div className='container p-4 max-w-5xl '>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr>
              <th className='px-4 py-2  border-b text-left max-sm:hidden'>#</th>
              <th className='px-4 py-2  border-b text-left'>Job Title</th>
              <th className='px-4 py-2  border-b text-left max-sm:hidden'>Date</th>
              <th className='px-4 py-2  border-b text-left max-sm:hidden'>Location</th>
              <th className='px-4 py-2  border-b text-center'>Applicants</th>
              <th className='px-4 py-2  border-b text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {
              jobs.map((job,index)=>(
                <tr key={index} className='text-gray-700'>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{index+1}</td>
                  <td className='py-2 px-4 border-b'>{job.title}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format("ll")}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden '>{job.location}</td>
                  <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                  <td className='py-2 px-4 border-b '>
                    <input className='scale-125 ml-4' type="checkbox" checked={job.visible} onChange={()=>changeJobVisibility(job._id)}/>
                  </td>
                </tr>
              ))

            }
          </tbody>
        </table>
      </div>
      <div className='flex justify-end mt-4'>
        <button onClick={()=>navigate('/dashboard/add-job')} className='bg-black text-white py-2 px-4 rounded'>Add New Job</button>
      </div>
    </div>
  ) : <Loading />
}

export default ManageJobs
