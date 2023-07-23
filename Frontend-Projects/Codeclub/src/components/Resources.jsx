import React from 'react'
import "./resources.css"
import Fr from "../img/front.jpg"
import Be from "../img/backend.jpg"
import Me from "../img/mern.jpg"
import Db from "../img/dbms.png"
import Ds from "../img/dsa.jpg"
import Fs from "../img/full stack.png"

const Resources = () => {
  return (
    <div className='r'>
        <p className="r-title">Study Resources</p>
        <div className="r-list">
            <div className="r-card">
                <img src={Fr} alt="" className="r-img" />
                <p className="r-desc">
                Front-end development involves the creation and implementation of user interfaces for websites and web applications. It encompasses the design, structure, and functionality of the client-facing portion of a website, typically utilizing HTML, CSS, and JavaScript. Front-end developers focus on enhancing user experience, ensuring responsiveness, and optimizing performance.                 
                </p>
                <button className="r-link">Link</button>
            </div>
            <div className="r-card">
                <img src={Be} alt="" className="r-img" />
                <p className="r-desc">                    
                Backend development refers to the implementation of server-side logic and functionality that powers websites and web applications. It involves working with databases, server management, and writing code that handles data processing, user authentication, and server communication. Backend developers focus on building robust and scalable systems that support the functionality and performance of the application.       
                </p>
                <button className="r-link">Link</button>
            </div>
            <div className="r-card">
                <img src={Me} alt="" className="r-img" />
                <p className="r-desc">
                MERN stack development refers to a full-stack web development approach that combines four technologies: MongoDB, Express.js , React (a JavaScript library for building user interfaces), and Node.js (a JavaScript runtime environment). It enables developers to create robust and scalable web applications using JavaScript throughout the entire development stack, from the front end to the back end.                    
                </p>
                <button className="r-link">
                    Link
                </button>
            </div>
            <div className="r-card">
                <img src={Db} alt="" className="r-img" />
                <p className="r-desc">                
                DBMS (Database Management System) is software that manages databases, allowing users to store, retrieve, and manipulate data efficiently. It provides an interface for creating, modifying, and querying databases, ensuring data integrity, security, and concurrency control. DBMS enables organizations to organize and manage vast amounts of structured and unstructured data effectively.                    
                </p>
                <button className="r-link">
                    Link
                </button>
            </div>
            <div className="r-card">
                <img src={Ds} alt="" className="r-img" />
                <p className="r-desc">
                DSA (Data Structures and Algorithms) is a field of study in computer science that focuses on designing and analyzing efficient methods for organizing and manipulating data to solve problems effectively. It involves the study of data structures, such as arrays, linked lists, trees, and graphs, and algorithms, which are step-by-step procedures for performing computations or solving specific tasks.                    
                </p>
                <button className="r-link">
                    Link
                </button>
            </div>
            <div className="r-card">
                <img src={Fs} alt="" className="r-img" />
                <p className="r-desc">
                Full stack web development refers to the practice of working on both the front end and back end of a web application. It involves expertise in programming languages, frameworks, and technologies required for developing the user interface, server logic, and database integration. Full stack developers have the skills to handle the entire web development process, from designing the user interface to managing the server infrastructure.                    
                </p>
                <button className="r-link">
                    Link
                </button>
            </div>
        </div>
    </div>
  )
}

export default Resources