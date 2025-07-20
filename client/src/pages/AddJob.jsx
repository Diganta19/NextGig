/* eslint-disable no-unused-vars */
import React, { useRef, useState,useEffect } from 'react'
import Quill from 'quill';
import  {JobCategories, JobLocations}  from '../assets/assets';

const AddJob = () => {

  const [title, setTitle] = useState('');
  const [location,setLocation] = useState('Bangalore')
  const[salary,setSalary] = useState(0)
  const [category,setCategory] = useState('Programming')
  const [level,setLevel] = useState('Beginner')

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(()=>{
      //Initiating Quill
      if(!quillRef.current && editorRef.current){
        quillRef.current =new Quill(editorRef.current,{
          theme:'snow',
        }) 
      }
  },[])
  return (
    <form className='container flex flex-col gap-3 items-start p-4 w-full'> 
      <div className='w-full'>
      <p className='mb-2'>Job Title</p>
      <input type="text" placeholder='Type Here' className='w-full px-3 py-2 border-2 border-gray-300 max-w-lg rounded' onChange={e=>setTitle(e.target.value)} value={title} required/>
      </div>

      <div className='w-full max-w-lg'>
        <p className='my-2'>Job Description</p>
        <div ref={editorRef}>

        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'> 
        <div>
          <p className='mb-2'>Job Category</p>
          <select  className="w-full  px-3 py-2 border-2 border-gray-300 rounded  "onChange={e => setCategory(e.target.value)} >
            {JobCategories.map((category,index)=>(
               <option value={category} key={index}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Job Location</p>
          <select className="w-full  px-3 py-2 border-2 border-gray-300 rounded  " onChange={e => setLocation(e.target.value)} >
            {JobLocations.map((location,index)=>(
               <option value={location} key={index}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'> Job Level</p>
          <select className="w-full  px-3 py-2 border-2 border-gray-300 rounded  " onChange={e => setLevel(e.target.value)} >
            <option value="Beginner level">Beginner Level</option>
             <option value="Intermediate level">Intermediate Level</option>
              <option value="Senior level">Senior Level</option>
          </select>
        </div>
      </div>

      <div>
        <p className='mb-2'>Job Salary</p>
            <input min={0}className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]" type="Number" placeholder='2500' onChange={e => setSalary(e.target.value)}/>
     </div>
     <button className='py-3 mt-4 w-28 bg-black text-white rounded'>ADD</button>
    </form>
    
  )
}

export default AddJob
