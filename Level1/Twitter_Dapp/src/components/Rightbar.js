import React from 'react';
import './Rightbar.css';
import hardhat from '../images/hardhat.jpg';
import solidity from '../images/solidity.jpg';
import metamask from '../images/metamask.jpg';
import react from '../images/react.png';
import solidity from "../images/solidity.png";
import { Input } from '@web3uikit/core';
import { Search } from '@web3uikit/icons';


const Rightbar = () =>{
    const trends = [
        {
          img:hardhat,
          text: "Learn how to use hardhat dev tool",
          link: "https://hardhat.org/",
      },
      {
          img:solidity,
          text: "Master smart contract development",
          link: "https://blog.oliverjumpertz.dev/the-ultimate-smart-contract-developer-roadmap",
      },
      {
          img:react,
          text: "Master React js in 2022",
          link: "https://blog.devgenius.io/become-a-react-dev-in-2022-a-comprehensive-list-of-tutorials-%EF%B8%8F-83e768b0a924",
      },
      {
          img:metamask,
          text: "Become a web3 developer",
          link: "https://alvarotrigo.com/blog/web3-developer/",
        },
      ];

    return (
        <>
        <div className='rightbarContent'>
            <Input label='Search Twitter' name='Search Twitter' prefixIcon={<Search/>} labelBgColor="#141d26"></Input>
        <div className='trends'>
            Trending
            {
                trends.map((e)=>{
                    return (
                        <>
                          <div className='trend' onClick={()=>window.open(e.link)}>
                              <img src={e.img} className='trendImg'></img>
                              <div className='trendText'>{e.text}</div>
                          </div>
                        </>
                    );
                })
            }
        </div>
        </div>
        </>
    );
}

export default Rightbar;