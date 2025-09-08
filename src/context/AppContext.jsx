import React, { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isSearched, setIsSearched] = useState(false);
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [jobs, setJobs] = useState([])

  const [showRecruiterLogin, setShowRecruiterLogin ] =useState(false) 

//   Functions to fetch jobs 

  const fetchJobs =async () => {
    setJobs(jobsData)
  }

  useEffect(()=>{
    fetchJobs()
  }, [])

  return (
    <AppContext.Provider
      value={{
        isSearched,
        setIsSearched,
        searchFilter,
        setSearchFilter,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
