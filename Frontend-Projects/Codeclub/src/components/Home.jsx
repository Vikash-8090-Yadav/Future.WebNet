import React from 'react'
import "./home.css"
import Ho from "../img/home.jpg"

const Home = () => {
  return (
    <div className='h'>
        <div className="h-left">
            <div className="h-left-items">
                <div className="h-bg">
                    <img src={Ho} alt="" className="h-img" />
                </div>
            </div>
        </div>
        <div className="h-right">
            <p className="h-title">
                Welcome to Codeclub!
            </p>
            <p className="h-desc">
            " A code club community provides a supportive and collaborative environment for 
            individuals passionate about coding, helping them develop skills, network, and 
            grow as programmers. The community encourages open discussions, knowledge 
            exchange, and mentoring, allowing individuals to grow their coding skills and 
            explore new areas of interest. With a focus on fostering creativity, innovation, 
            and collaboration, the Coding Club Community serves as a hub for like-minded 
            individuals to connect, inspire, and make a positive impact through their 
            shared passion for coding. "
            </p>
            <button className="join">
                <p className="join-text">Join the Codeclub</p>
            </button>
        </div>
    </div>
  )
}

export default Home