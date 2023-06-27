import React from 'react'
import "./blogs.css"
import ImageUploader from './ImageUploader'
import P1 from "../img/m1.jpg"
import P2 from "../img/m2.jpg"
import Bi from "../img/blog-icon.png"

const Blogs = () => {
    return (
        <div className='b'>
            <p className="b-title">Latest Stuffs</p>
            <div className="b-buttons">
                <button className="button-items">Programming</button>
                <button className="button-items">Development</button>
                <button className="button-items">Internship</button>
                <button className="button-items">Career</button>
            </div>
            <div className="b-blogs">
                <div class="card">
                    <div class="card-front">
                        <img src={P1} alt="" className='b-img' />
                        <div className="person">
                            <p className="name">Martin Fowler</p>
                            <p className="name-title">#1 most famous programming blog</p>
                        </div>
                        <button className="read">
                            READ NOW
                        </button>
                    </div>
                    <div className="card-content">
                        <p className="desc">Master feed of news and updates from martinfowler.com.</p>
                    </div>
                    <ul className="content-list">
                        <li className="items">Modulazrizing React applications</li>
                        <li className="items">Comparing Engagement on Twitter</li>
                        <li className="items">Exploring Madoston: status for February 2023</li>
                    </ul>
                </div>

                <div class="card">
                    <div class="card-front">
                        <img src={P2} alt="" className='b-img' />
                        <div className="person">
                            <p className="name">Joel Spolsky</p>
                            <p className="name-title">#2 most famous programming blog</p>
                        </div>
                        <button className="read">
                            READ NOW
                        </button>
                    </div>
                    <div className="card-content">
                        <p className="desc">A weblog by Joel Spolsky, a programmer working in New York City, about software and software companies.</p>
                    </div>
                    <ul className="content-list">
                        <li className="items">Bridcage liners</li>
                        <li className="items">Developers side projects</li>
                        <li className="items">Victory Lap for Ask Patents</li>
                    </ul>
                </div>
            </div>

            <div className="head">
                <div className="dotted"></div>
                <p className="new-title">Write your blog</p>
                <div className="dotted"></div>
            </div>

            <div className="blog-items">
                <div className="b-left">
                    <img src={Bi} alt="" className="blog-icon" />
                </div>

                <div className="b-right">
                    <div className="info-list">
                        <input type='text' placeholder='Name' className="full-name"/>
                        <input type='text' placeholder='Email' className="email"/>
                        <h3>
                            Upload an Image
                            <ImageUploader />
                        </h3>
                        <textarea type='text' rows='5' placeholder='Message' className="message"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogs