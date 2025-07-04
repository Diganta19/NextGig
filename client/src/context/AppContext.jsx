/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { createContext } from "react";

export const AppContext = createContext()

export const  AppContextProvider = (props)=>{

        const [searchFilter, setSearchFilter] = React.useState({
                title:'',
                location:''
        });

        const [isSearched,setIsSearched] = React.useState(false)
        const value = {
                        setSearchFilter,searchFilter,
                        isSearched,setIsSearched
        }

        return(<AppContext.Provider value={value}>{props.children}</AppContext.Provider>)
}