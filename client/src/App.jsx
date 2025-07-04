
import './App.css'  
import React from 'react';
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home"
import Applications from "./pages/Applications"
import ApplyJobs from "./pages/ApplyJobs"

function App() {


  return (
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
           <Route path="/apply-job/:id" element={<ApplyJobs />}/>
            <Route path="/applications" element={<Applications />}/>
        </Routes>
      </div>
      
  )
}

export default App
