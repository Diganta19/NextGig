/* eslint-disable no-unused-vars */
import React, { useContext, useState,useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
  const [showFilter,setShowFilter] = useState(false)
    const {isSearched,searchFilter,setSearchFilter,jobs} = useContext(AppContext)
    const [currentPage,setCurrentPage ] = useState(1);
    const [selectedCategories,setSelectedCategories] = useState([])
    const [selectedLocations,setSelectedLocations] = useState([])

    const [filteredJobs,setFilteredJobs] = useState(jobs);


    const handleCategoryChange = (category) =>{
      setSelectedCategories(
        prev => prev.includes(category) ? prev.filter(c => c !== category): [...prev,category]
      )
    }

    const handleLocationChange = (location) =>{
      setSelectedLocations(
        prev => prev.includes(location) ? prev.filter(c => c !== location): [...prev,location]
      )
    }


    useEffect(()=>{
      const matchesCategory = job => selectedCategories.length === 0 ||  selectedCategories.includes(job.category)
      const matchesLocation = job => selectedLocations.length === 0 || selectedCategories.includes(job.location)
      const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
      const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

      const newFilteredJobs = jobs.slice().reverse().filter(
        job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
      )
      setFilteredJobs(newFilteredJobs);
      setCurrentPage(1);
    },[selectedCategories,selectedLocations,searchFilter,jobs])

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

      
        <button onClick={e=>setShowFilter(p=>!p)} className='px-6 py-1.5 rounded border border-grey-600 lg:hidden'>
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
                <input className='scale-125' type="checkbox" onChange={ ()=>handleCategoryChange(category)} checked={selectedCategories.includes(category)}/>
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
                <input className='scale-125' type="checkbox" checked={selectedLocations.includes(location)} onChange={()=>handleLocationChange(location)}/>
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
                filteredJobs.slice((currentPage-1)*6,currentPage*6).map((jobData,index)=>(
                  <JobCard key={index} job={jobData}/>
                ))
              }
            </div>

              {/*Pagination*/}
              {
                filteredJobs.length > 0 && (
                  <div className='flex justify-center items-center space-x-2 mt-10'> 
                    <a href="#job-list">
                      <img src={assets.left_arrow_icon}  onClick={()=>setCurrentPage(Math.max(currentPage - 1),1)}/>
                    </a>
                    {
                      Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,index)=>(
                        <a key={index}href="#job-list">
                          <button onClick={()=>setCurrentPage(index+1)} className={`w-10 h-10 flex justify-center items-center border border-gray-300 rounded ${currentPage === index+1 ? 'bg-blue-100 text-blue-500': "text-grey-500"}`}>{index+1}</button>
                        </a>
                      ))
                    }
                     <a href="#job-list">
                      <img src={assets.right_arrow_icon} onClick={()=>setCurrentPage(Math.min(currentPage + 1),Math.ceil(filteredJobs.length/6))} />
                    </a>
                  </div>
                )
              }

          </section>  
    </div>
  )
}

export default JobListing
