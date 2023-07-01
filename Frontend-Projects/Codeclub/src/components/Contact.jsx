import React from 'react'
import "./contact.css"
import Lo from "../img/logo.png"
import In from "../img/insta.png"
import Tw from "../img/twitter.png"
import Li from "../img/linkedin.png"

const Support = () => {
  return (
    <div className='s'>
      <div className="s-left">
        <img src={Lo} alt="" className="logof" />
        <p className="logo-title">Codeclub</p>
      </div>
      <div className="s-middle">
        <div className="middle-list">
          <p className="s-items">About</p>
          <p className="s-items">Start a Code Club</p>
          <p className="s-items">Resources</p>
          <p className="s-items">Blog</p>
          <p className="s-items">Privacy Policy</p>
        </div>
      </div>

      <div className="s-right">
      <p className='s-title'>&copy; 2023 Code Club. All rights reserved.</p>
      <div className="s-img-list">
          <img src={Li} alt="" className="s-img" />
          <img src={Tw} alt="" className="s-img" />
          <img src={In} alt="" className="s-img" />
        </div>
      </div>
    </div>
  )
}

export default Support