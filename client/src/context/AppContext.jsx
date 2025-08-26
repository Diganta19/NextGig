/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { createContext } from "react";
// import { jobsData } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext()

export const  AppContextProvider = (props)=>{   
        const backendUrl = import.meta.env.VITE_BACKEND_URL

        const [searchFilter, setSearchFilter] = React.useState({
                title:'',
                location:''
        });

        const [isSearched,setIsSearched] = React.useState(false)


        const [jobs,setJobs]= React.useState([]);

        const fetchJobs = async() =>{
              try{
                const {data}  = await axios.get(backendUrl+'/api/jobs')
                if(data.success){
                        setJobs(data.jobs)
                        console.log(data.jobs)
                }else{
                        toast.error(data.message)
                }
              }catch(error){
                toast.error(error.message)
              }
        }

        //Function to fetch Company data
        const fetchCompanyData = async()=>{
                try {
                      const {data} = await axios.get(backendUrl+'/api/company/company',{headers:{token:companyToken}})  
                      if(data.success){
                        setCompanyData(data.company)
                        console.log(data);
                        
                      }else{
                        toast.error(data.message)
                      }

                } catch (error) {
                        toast.error(error.message)
                }
        }
        const [showRecruiterLogin,setShowRecruiterLogin] = React.useState(false);

        const [companyToken,setCompanyToken] = React.useState(null);
        const [companyData,setCompanyData] = React.useState(null)

        useEffect(()=>{
                fetchJobs()
                const storedCompanyToken = localStorage.getItem('companyToken')

                if(storedCompanyToken){
                        setCompanyToken(storedCompanyToken)
                }
        },[])

        useEffect(()=>{
                if(companyToken){
                        fetchCompanyData();

                }
        },[companyToken])
        const value = {
                        setSearchFilter,searchFilter,
                        isSearched,setIsSearched,
                        jobs,setJobs,
                        showRecruiterLogin,setShowRecruiterLogin,
                        companyToken,setCompanyToken,
                        companyData,setCompanyData,
                        backendUrl

        }

        return(<AppContext.Provider value={value}>{props.children}</AppContext.Provider>)
}