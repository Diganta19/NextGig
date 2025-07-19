
import './App.css'  
import React, { useContext } from 'react';
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home"
import Applications from "./pages/Applications"
import ApplyJobs from "./pages/ApplyJobs"
import RecruiterLogin from './components/RecruiterLogin';
import { AppContext } from './context/AppContext';

function App() {

  const {showRecruiterLogin} = useContext(AppContext);

  return (
      <div>
        {
          showRecruiterLogin && <RecruiterLogin />
        }
        <Routes>
          <Route path="/" element={<Home />}/>
           <Route path="/apply-job/:id" element={<ApplyJobs />}/>
            <Route path="/applications" element={<Applications />}/>
        </Routes>
      </div>
      
  )
}

export default App
