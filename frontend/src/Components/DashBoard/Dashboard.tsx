
import React, { useRef } from "react";
import './styledashb.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'primereact/tooltip';
import { Badge } from 'primereact/badge';
import { AiOutlineFilter, AiOutlineContainer, AiOutlineFileProtect, AiOutlineSnippets, AiOutlineSetting, AiOutlineLogout, AiOutlineSearch, AiOutlineFund } from "react-icons/ai";
import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';



const Dashboard = () => {
    const urll = 'http://localhost:8000'
    const navRef = useRef(null);
    const [showForm, setShowForm] = useState(false);
    const [isNavClose, setIsNavClose] = useState(false);
    const [items, setItems] = useState([]);
    const user = localStorage.getItem('display_name');
    const navcloseFunc = () => {
        // Toggle the state to control the className
        setIsNavClose(!isNavClose);
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

            <div className="main-container">
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
                <div className="main">

                   
                     <><div className="searchbar2">
                        <input type="text"
                            name=""
                            id=""
                            placeholder="Search" />
                        <div className="searchbtn">

                        </div>
                    </div>


                        <div>

                            <div className="box-container">

                                <div className="box box1">

                                    <div className="text">
                                        <h2 className="topic-heading">$15000</h2>
                                        <h2 className="topic">Total Earning</h2>
                                    </div>


                                </div>

                                <div className="box box2">
                                    <div className="text">
                                        <h2 className="topic-heading">320</h2>
                                        <h2 className="topic">Activity Tracks</h2>
                                    </div>

                                </div>

                                <div className="box box3">
                                    <div className="text">
                                        <h2 className="topic-heading">70</h2>
                                        <h2 className="topic">Completed Tasks</h2>
                                    </div>

                                </div>

                                <div className="box box4">
                                    <div className="text">
                                        <h2 className="topic-heading">10</h2>
                                        <h2 className="topic">Pending Tasks</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="report-container">
                                <div className="report-header">
                                    <h1 className="recent-Articles"></h1>
                                    <div>
                                        <label className="view">Sort By : </label>
                                        <select name="" id="">
                                            <option value="">Today</option>
                                            <option value="">Last Week</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="report-body">
                                    <div className="report-topic-heading">
                                        <h3 className="t-op">DateTime</h3>
                                        <h3 className="t-op">Opening Bid</h3>
                                        <h3 className="t-op">Closing Bid</h3>
                                        <h3 className="t-op">Status</h3>
                                    </div>

                                    <div className="items">
                                        <div className="item1">
                                            <h3 className="t-op-nextlvl">Article 73</h3>
                                            <h3 className="t-op-nextlvl">2.9k</h3>
                                            <h3 className="t-op-nextlvl">210</h3>
                                            <h3 className="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div className="item1">
                                            <h3 className="t-op-nextlvl">Article 72</h3>
                                            <h3 className="t-op-nextlvl">1.5k</h3>
                                            <h3 className="t-op-nextlvl">360</h3>
                                            <h3 className="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div className="item1">
                                            <h3 className="t-op-nextlvl">Article 71</h3>
                                            <h3 className="t-op-nextlvl">1.1k</h3>
                                            <h3 className="t-op-nextlvl">150</h3>
                                            <h3 className="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div className="item1">
                                            <h3 className="t-op-nextlvl">Article 70</h3>
                                            <h3 className="t-op-nextlvl">1.2k</h3>
                                            <h3 className="t-op-nextlvl">420</h3>
                                            <h3 className="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div className="item1">
                                            <h3 className="t-op-nextlvl">Article 69</h3>
                                            <h3 className="t-op-nextlvl">2.6k</h3>
                                            <h3 className="t-op-nextlvl">190</h3>
                                            <h3 className="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div className="item1">
                                            <h3 className="t-op-nextlvl">Article 68</h3>
                                            <h3 className="t-op-nextlvl">1.9k</h3>
                                            <h3 className="t-op-nextlvl">390</h3>
                                            <h3 className="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div className="item1">
                                            <h3 className="t-op-nextlvl">Article 67</h3>
                                            <h3 className="t-op-nextlvl">1.2k</h3>
                                            <h3 className="t-op-nextlvl">580</h3>
                                            <h3 className="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div className="item1">
                                            <h3 className="t-op-nextlvl">Article 66</h3>
                                            <h3 className="t-op-nextlvl">3.6k</h3>
                                            <h3 className="t-op-nextlvl">160</h3>
                                            <h3 className="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                        <div className="item1">
                                            <h3 className="t-op-nextlvl">Article 65</h3>
                                            <h3 className="t-op-nextlvl">1.3k</h3>
                                            <h3 className="t-op-nextlvl">220</h3>
                                            <h3 className="t-op-nextlvl label-tag">Published</h3>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </> 


                    

                </div>
            </div>

        </>
    )
}
export default Dashboard;


