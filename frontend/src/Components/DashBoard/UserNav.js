
import React, { useRef } from "react";
import './styledashb.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'primereact/tooltip';
import { Badge } from 'primereact/badge';
import { AiOutlineFilter, AiOutlineContainer, AiOutlineFileProtect, AiOutlineSnippets, AiOutlineSetting, AiOutlineLogout, AiOutlineSearch, AiOutlineFund } from "react-icons/ai";
import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';



const Usernav = () => {
    const urll = 'http://localhost:8000'
    const navRef = useRef(null);
    const [showForm, setShowForm] = useState(false);
    const [isNavClose, setIsNavClose] = useState(false);
    const [NavBoxClose,setNavBoxClose]=useState(false)
    const [items, setItems] = useState([]);
    const user = localStorage.getItem('display_name');

    const navcloseFunc = () => {
        // Toggle the state to control the className
        setIsNavClose(!isNavClose);
        setNavBoxClose(!isNavClose);
      };

    const Navigation = useNavigate();
    const Logoclick = () => {
        Navigation("/")
    }
  
    const dashboard_btn = async() => {
        const token=localStorage.getItem('jwtToken')
        await axios.get(`${urll}/dashboard`,{headers:{'Authorization':token}}).then(response => {
          // Handle successful response and update the dashboard UI
          console.log("response recieved from Dashboard verification",response);
          if(response.status==200)
          {
            Navigation("/dashboard");
          }
        })
        .catch(error => {
          console.error('Error fetching dashboard data:', error);
        }); 
    }
    const foreclosure_btn = async() => {
        const token=localStorage.getItem('jwtToken')
        await axios.get(`${urll}/foreclosure`,{headers:{'Authorization':token}}).then(response => {
          // Handle successful response and update the dashboard UI
          console.log("response recieved from Foreclosure verification",response);
          if(response.status==200)
          {
            Navigation("/foreclosure");
          }
        })
        .catch(error => {
          console.error('Error fetching foreclosure data:', error);
        });  
    }
    const optionList = [
        { value: "Dashboard", label: "Dashboard" },
        { value: 'FCdata', label: "Foreclosure" },
        { value: "Activities", label: "Activities" },
        { value: "Mytask", label: "My Task" },

    ];
 
   
    return (
        <>
            <header>

                <div className="logosec">
                    <div className="logo" onClick={Logoclick}>CRM App</div>
                    <span className="pi pi-bars icn menuicn" onClick={navcloseFunc}></span>
                </div>

                <div className="searchbar">
                     <div className="card flex justify-content-center">
                        <Dropdown value={items} onChange={(e) => setItems(e.value)} options={optionList} optionLabel="label"
                            editable placeholder="Search" className="w-full md:w-14rem" />
                    </div> 


                </div>

                <div className="message">

                    <Tooltip target=".custom-target-icon" />

                    <i className="custom-target-icon pi pi-envelope p-text-secondary p-overlay-badge"
                        data-pr-tooltip="No notifications"
                        data-pr-position="right"
                        data-pr-at="right+5 top"
                        data-pr-my="left center-2"
                        style={{ fontSize: '2rem', cursor: 'pointer' }}>
                        <Badge severity="danger"></Badge>
                    </i>

                    <div className="dp">
                        <img src=
                            "https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                            className="dpicn"
                            alt="dp" />
                    </div>
                    <h6 style={{ color: 'black', fontWeight: '100', fontSize: '15px' }}>{user}</h6>

                </div>

            </header>

            <div className={`main-container ${NavBoxClose? 'navboxclose' : ''}` }>
            <div className={`navcontainer ${isNavClose ? 'navclose' : ''}`} ref={navRef} >
                    <nav className="nav" ref={navRef}>
                        <div className="nav-upper-options">
                            <div className="nav-option option1 " onClick={dashboard_btn}>
                                <AiOutlineFund className="nav-img" />
                                <h3> Dashboard</h3>
                            </div>

                            <div className="option2 nav-option" onClick={foreclosure_btn}>
                                <AiOutlineContainer className="nav-img" />
                                <h3> Foreclosure</h3>
                            </div>

                            <div className="nav-option " >
                                <AiOutlineFileProtect className="nav-img" />
                                <h3> Activities</h3>
                            </div>

                            <div className="nav-option option4">
                                <AiOutlineSnippets className="nav-img" />
                                <h3>My Task</h3>
                            </div>


                            <div className="nav-option option6">

                                <AiOutlineSetting className="nav-img" />
                                <h3> Settings</h3>
                            </div>

                            <div className="nav-option logout">

                                <AiOutlineLogout className="nav-img" />
                                <h3>Logout</h3>
                            </div>

                        </div>
                    </nav>
                </div>
             
            </div>

        </>
    )
}
export default Usernav;


