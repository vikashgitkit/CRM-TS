import React from 'react';
import logo from './logo.svg';
import './App.css';
// 
import Login from './Components/Login/Login'
import Dashboard from './Components/DashBoard/Dashboard'
import DashFC from './Components/DashBoard/DashFC'
import Admindashboard from './Components/DashBoard/Admin/Admindashboard'
import Uploads from './Components/DashBoard/Admin/Uploads'
import AdminNavbar from './Components/DashBoard/Admin/AdminNavbar';
import Usernav from './Components/DashBoard/UserNav';
import Foreclosure from './Components/DashBoard/Foreclosure'
import NewUpload from './Components/DashBoard/Admin/NewUpload';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  console.log("hello")
  return (
 <div >
       <BrowserRouter>
     <Routes>
     <Route path='/' element={<Login/>}></Route>
     <Route path='/nav' element={<AdminNavbar/>}/>
     <Route path='/nav' element={<AdminNavbar/>}/>
     <Route path='/usernav' element={<Usernav/>}/>
     
     <Route element={<ProtectedRoutes/>}>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/foreclosure' element={<Foreclosure/>}></Route>
      <Route path='/dashboard/ForeclosureData' element={<DashFC/>}></Route>
      <Route path='/Admin/admin-dashboard' element={<Admindashboard/>}></Route>
      <Route path='/Admin/upload-data' element={<Uploads/>}></Route>
      <Route path='/Admin/upload-data/new-upload' element={<NewUpload/>}></Route>
      <Route path='/nav' element={<AdminNavbar/>}/>
      </Route>

     </Routes>
     
     </BrowserRouter> 
    </div>
   
  );
}

export default App;
