/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useAuth, useUser} from '@clerk/clerk-react';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const {user} = useUser();
  const {getToken} = useAuth();

  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  const [searchFilter, setSearchFilter] = React.useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = React.useState(false);

  const [jobs, setJobs] = React.useState([]);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/jobs");
      if (data.success) {
        setJobs(data.jobs);
        console.log(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Function to fetch Company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/company", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setCompanyData(data.company);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const [showRecruiterLogin, setShowRecruiterLogin] = React.useState(false);

  const [companyToken, setCompanyToken] = React.useState(null);
  const [companyData, setCompanyData] = React.useState(null);

  //Function to fetch user data
  const fetchUserData = async()=>{
        try {
                const token = await getToken();
                const {data} = await axios.get(backendUrl+'/api/users/user',
                        {headers:{Authorization:`Bearer ${token}` }})
                        console.log("UserData:"+data);
                if(data.success){
                        
                        
                        setUserData(data.user)
                }else{
                        toast.error(data.message)
                }
        } catch (error) {
                toast.error(error.message)
        }
  }

  //Function to fetch users applied jobs
  const fetchUserApplications = async()=>{
    try {
      const token = await getToken();
      const{data} = await axios.get(backendUrl+'/api/users/applications',
        {headers:{Authorization:`Bearer ${token}`}}
      )

      if(data.success){
        setUserApplications(data.applications)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  } 
  useEffect(() => {
    fetchJobs();
    const storedCompanyToken = localStorage.getItem("companyToken");

    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  useEffect(()=>{
         
         
        if(user){
                fetchUserData();
                fetchUserApplications();
        }
  },[user])

  const value = {
    setSearchFilter,
    searchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
    userData,
    userApplications,setUserApplications,setUserData,fetchUserData,
    fetchUserApplications
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
