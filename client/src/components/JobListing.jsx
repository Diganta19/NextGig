/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
  const [showFilter,setShowFilter] = useState(true)
    const {isSearched,searchFilter,setSearchFilter,jobs} = useContext(AppContext)
  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col py-8 lg:flex-row max-lg:space-y-8'> 

      <div className="w-full lg:w-1/4 bg-white px-4">
      {
        isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && 
        (<>
            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
           <div className='mb-4 text-grey-600'> {
            searchFilter.title && (<span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{searchFilter.title}
            <img onClick={e => setSearchFilter(p => ({...p,title:""}))} src={assets.cross_icon} className="cursor-pointer"  />
            </span>) 

            }
            {
                searchFilter.location && (<span className=' ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{searchFilter.location}
                <img onClick={e => setSearchFilter(p => ({...p,location:""}))} src={assets.cross_icon} className="cursor-pointer"  />
                </span>)
            }
            </div>
        </>)
      }

      
        <button onClick={e=>setShowFilter(p=>!p)} className='px-6 py-1.5 rounded border border-grey-600'>
          {
             showFilter ? "Close" : "Filters"
          }
        </button>
       
      

      <div className={showFilter ? "" : 'max-lg:hidden'}>
        <h4 className='font-medium text-lg py-4 '>Search By Category</h4> 
        <ul className='space-y-4 text-grey-600'>
          {
            JobCategories.map((category,index)=>(
              <li key={index} className='flex gap-3 items-center'>
                <input className='scale-125' type="checkbox" name='' id=''/>
                {category}
              </li>
            ))
          }
        </ul>
      </div>




      <div className={showFilter ? "" : 'max-lg:hidden'}>
        <h4 className='font-medium text-lg py-4 pt-14'>Search By Location</h4> 
        <ul className='space-y-4 text-grey-600'>
          {
            JobLocations.map((location,index)=>(
              <li key={index} className='flex gap-3 items-center'>
                <input className='scale-125' type="checkbox" name='' id=''/>
                {location}
              </li>
            ))
          }
        </ul>
      </div>
      </div>
        <section className='w-full lg:w-3/4 text-grey-800 max-lg:px-4'> 
            <h3 className='font-medium text-3xl py-2' id="job-list">Job Listing</h3>
            <p className='mb-8'>Get Your Desired Job From Top Companies</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
              {
                jobs.map((jobData,index)=>(
                  <JobCard key={index} job={jobData}/>
                ))
              }
            </div>
          </section>  
    </div>
  )
}

export default JobListing
