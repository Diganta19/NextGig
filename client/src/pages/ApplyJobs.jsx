import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import { assets } from '../assets/assets';
import kconvert from 'k-convert'
import moment from 'moment'
import Navbar from "../components/Navbar"

const ApplyJobs = () => {
  const {id} = useParams()

  // eslint-disable-next-line no-unused-vars
  const [jobData,setJobData] = useState(null);

  const {jobs } = useContext(AppContext);

  const fetchJob = async() =>{
    const data = jobs.filter(job=>job._id === id);
    if(data.length !== 0 ){
      setJobData(data[0]);console.log(data[0]);
      
    }
  }

  useEffect(()=>{
    if(jobs.length>0){
      fetchJob();
    }
  },[id,jobs])

  return jobData ? (
    <>
    <Navbar/>

     <div className='container min-h-screen flex flex-col py-10 px-4 2xl:px-20 mx-auto'>
        <div className='rounded w-full text-black bg-white'>
          <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 border border-sky-400 rounded-xl'>
            <div className='flex flex-col md:flex-row items-center'>
              <img className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"src={assets.company_icon} alt="" />
              <div className='text-center md:text-left text-neutral-700'>
                <h1 className='text-2xl sm:txt-4xl font medium'>{jobData.title}</h1>
                <div className='flex flox-row flex-wrap max-md:justify-center gap-6 items-center text-gray-600 mt-2'><span  className='flex gap-1 items-center'><img src={assets.suitcase_icon} alt="" />{jobData.companyId.name}</span>
                <span className='flex gap-1 items-center'><img src={assets.location_icon}  />{jobData.location}</span>
                <span  className='flex gap-1 items-center'><img src={assets.person_icon}/>{jobData.level}</span>
                <span  className='flex gap-1 items-center'><img src={assets.money_icon} />CTC:{kconvert.convertTo(jobData.salary)}</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center text-end text-sm max-md:text-center max-md:mx-auto  '> 
              <button className='bg-blue-600 p-2.5 px-10 text-white rounded'>Apply Now</button>
              <p className='mt-1 text-gray-600'>{moment(jobData.date).fromNow()}</p>
            </div>
          </div>
        </div>
      </div> 
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJobs
