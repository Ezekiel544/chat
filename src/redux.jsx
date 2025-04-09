import { useState } from "react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillDelete } from "react-icons/ai";
import './redux.css'
import Fireicon from './assets/fireicon.png'
import Blazeicon from './assets/blazeicon.png'
import Goodicon from './assets/goodicon.png'
import Ladyicon from './assets/ladyicon.png'
import Settingicon from './assets/setting.png'
import Searchicon from './assets/searchicon.png'
import Timeimg from './assets/timeimg.png'
import Manimg from './assets/man.png'
import Plusimg from './assets/plusimg.png'
import Plustwo from './assets/plustwo.png'
import Plusthree from './assets/plusthree.png'
import Rhemaux from './assets/rhemaux.png'
import Messageicon from './assets/messageicon.png'
import Communityimg from './assets/communityimg.png'
// import { Link } from "react-router-dom";
function Redux () {
  const [successCount, setSuccessCount] = useState(0);
  const [failureCount, setFailureCount] = useState(0);
  const [task, setTask] = useState(""); 
  const [tasks, setTasks] = useState([]); 

  const addTask = () => {
    if (task.trim() === "") {
      setFailureCount(failureCount + 1); 
      return;
    }

    setTasks([task, ...tasks]); 
    setTask("");
    setSuccessCount(successCount + 1); 
  };


   const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    setSuccessCount(successCount - 1); 
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter(task => 
    task.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const showTaskAlert = () => {
    if (tasks.length === 0) {
      alert("No tasks available");
    } else {
      alert("Your Tasks:\n" + tasks.join("\n"));
    }
  };
  
  const editTask = (index) => {
    const newTask = prompt("Edit your task:", tasks[index]); 
    if (newTask !== null && newTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index] = newTask;
      setTasks(updatedTasks);
    }
  };
  

  return (
    <>
      <div className="general-div container">
         <div className="row">
         <nav className="my-nav col-1 d-none d-lg-block">
             <ul >
                <li><img src={Fireicon} alt="fireicon" width={47} className="fireicon"/></li>
                <li><img src={Blazeicon} alt="blazeicon" width={47} className="blazeicon"/></li>
                <li><img src={Goodicon} alt="goodicon" /></li>
                <li><img src={Messageicon} alt="messageicon" /></li>
                <li><img src={Ladyicon} alt="ladyicon" /></li>
                <li><img src={Settingicon} alt="settingicon" /></li>
             </ul>
         </nav>
         <div className="col-12 col-lg-8  main-contain-div ">
        <div className="p-2 rounded d-flex align-items-center search-div col-5">
<input
  type="text"
  className="form-control me-2"
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
<img src={Searchicon} alt="Search" className="searchicon" />
    </div>


<div className="search-results mt-2">
  {searchQuery && (
    filteredTasks.length > 0 ? (
      <ul className="list-group container-item">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((t, index) => (
          <li key={index} className="list-group-item">
            {t}
          </li>
        ))
      ) : (
        <li className="list-group-item">No tasks found</li>
      )}
    </ul>
    
    ) : (
      <p className="text-muted">No items available</p>
    )
  )}
</div>

            <main className=" row ">
               <div className="col-7  todaywarningdiv">
                <h1>Today task</h1>
                <p>check your daily tasks and schedules</p>
              <button className="col-5" onClick={showTaskAlert}>
        Today's Schedule
      </button>

               </div>
               <div className="col-5 timeimg">
                    <img src={Timeimg} alt="timeimg"/>
               </div>
            </main>
            <section className=" row  section-c mt-3 mt-lg-0">
                 <div className="colt col-12 col-md three-column-div">
                    <p className="three-column-p">Nov 2, 2022</p>
                      <div className="three-web-div">
                        <h5>Web Dashboard</h5>
                        <p>Designing</p>
                           <div className="my-span">
                             <div className="my-span-three">

                             </div>
                           </div>

                           <div className="p-progress">
                             <p>progress</p>
                             <p>90%</p>
                           </div>
                         
                         <div className="people-progress">
                              <img src={Manimg} alt="" />
                              <img src={Manimg} alt=""  className="manimg"/>
                              <img src={Plusimg} alt=""  className="plusimg"/>
                              <span>3days left</span>
                         </div>
                      </div>
                     
                 </div>

                <div className=" col-12 col-md colt three-column-div">
                    <p className="three-column-p">Nov 26, 2022</p>
                      <div className="three-web-div">
                        <h5>Web Dashboard</h5>
                        <p>Designing</p>
                           <div className="my-span-headtwo">
                             <div className="my-span-head-child">

                             </div>
                           </div>

                           <div className="p-progress">
                             <p>progress</p>
                             <p>30%</p>
                           </div>
                         
                         <div className="people-progress">
                              <img src={Manimg} alt="" />
                              <img src={Manimg} alt=""  className="manimg"/>
                              <img src={Plustwo} alt=""  className="plusimg"/>
                              <span className="span-two">10days left</span>
                         </div>
                      </div>
                     
                 </div>

                
                 <div className=" col-12 col-md colt three-column-div">
                    <p className="three-column-p">Nov 26, 2022</p>
                      <div className="three-web-div">
                        <h5>Web Dashboard</h5>
                        <p>Designing</p>
                           <div className="my-span-headthree">
                             <div className="my-span-head-childtwo">

                             </div>
                           </div>

                           <div className="p-progress">
                             <p>progress</p>
                             <p>75%</p>
                           </div>
                         
                         <div className="people-progress">
                              <img src={Manimg} alt="" />
                              <img src={Manimg} alt=""  className="manimg"/>
                              <img src={Plusthree} alt=""  className="plusimg"/>
                              <span className="span-three">10days left</span>
                         </div>
                      </div>
                     
                 </div>

            </section>
            <aside className=" row bigmesse">
                 <div className=" col-12 col-lg-6 metee">
      <ul className="list-group list-groupss container-item">
        {tasks.map((t, index) => (
         <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
         {t}
         <div>
           <button className="btn btn-warning btn-sm mx-2" onClick={() => editTask(index)}>
             ✏️ Edit
           </button>
           <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>
             <AiFillDelete size={18} /> 
           </button>
         </div>
       </li>
        ))}
      </ul>
      </div>
          <div  className=" col-12 col-lg-6 mesee">
                 <div className="d-flex mb-3 mt-2">
        <input
          type="text"
          className=" me-2 last-form col-8  ps-2"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-primary col-4" onClick={addTask}>
          Add Task
        </button>
      </div>
         <div>
         <p className="success-count">{successCount} tasks have been added successfully, {failureCount} unsuccessful.</p>

         </div>
          </div>
            </aside>
         </div>
          <div className="col-12 col-lg-3 aside-part   mt-lg-0  ">
               <div className="aside-part-one">
                  <div className="d-flex align-items-center gap-1 rhemaux-div">
                  <img src={Rhemaux} alt="Rhemaux"  width={50}/>
                   <h5 className="mt-3">Don Victor <p className="front-dev">Frontend dev</p> </h5> 
                   
                  </div>
                  <div>
                  <img src={Communityimg}alt="" />
                  <p className="front-dev text-center mt-4 second-front-dev">We are frontend developers that work with you</p>
                  <p>Bringing well crashed and scalable infascture</p>
                  <button className="col-5 hire-us">Hire us</button>
                  </div>
               </div>
               
          </div>
         </div>
      </div>
     
    </>
  
  )
}
export default Redux