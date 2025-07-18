import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
const JobCard = ({job}) => {
  const navigate = useNavigate();
  return (
    <div className='border p-6 shadow rounded'>
      <div className='flex justify-between items-center'>
        <img className="h-8"src={assets.company_icon} alt="" />
      </div>
      <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
      <div className='flex items-center gap-3 mt-2 text-xs'>
        <span className='bg-blue-50 blue border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
        <span className='bg-red-50 blue border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
      </div>
      <p  className="text-grey-500 text-sm mt-4" dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
      <div className='flex mt-4 gap-4 text-sm'>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`)}}className='bg-blue-600 py-2 rounded text-white  px-4'>Apply Now</button>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`)}}className='text-grey-500 border border-grey-500 rounded'>Learn More</button>
      </div>
    </div>
  )
}

export default JobCard
