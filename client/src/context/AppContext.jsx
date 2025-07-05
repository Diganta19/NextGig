/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { createContext } from "react";
import { jobsData } from '../assets/assets';

export const AppContext = createContext()

export const  AppContextProvider = (props)=>{

        const [searchFilter, setSearchFilter] = React.useState({
                title:'',
                location:''
        });

        const [isSearched,setIsSearched] = React.useState(false)


        const [jobs,setJobs]= React.useState([]);

        const fetchJobs = async() =>{
                setJobs(jobsData);
        }

        useEffect(()=>{
                fetchJobs()
        },[])
        const value = {
                        setSearchFilter,searchFilter,
                        isSearched,setIsSearched,
                        jobs,setJobs
        }

        return(<AppContext.Provider value={value}>{props.children}</AppContext.Provider>)
}