import React from 'react'
import "./about.css"
import Me from "../img/boy.png"
import Re from "../img/resources.png"
import Co from "../img/community.png"
import Pl from "../img/plus.png"
import Eq from "../img/equal.png"


const About = () => {
  return (
    <div className='a'>
        <div className="a-items">
            <img src={Me} alt="" className="a-img" />
            <p className="a-desc">Enthusiatic People</p>
        </div>
        <img src={Pl}  alt="" className='a-imgsy' />
        <div className="a-items">
            <img src={Re} alt="" className="a-img" />
            <p className="a-desc">Free Resources</p>
        </div>
        <img src={Eq} alt="" className="a-imgsy" />
        <div className="a-items">
            <img src={Co} alt="" className="a-img" />
            <p className="a-desc">Great Community</p>
        </div>
    </div>
  )
}

export default About