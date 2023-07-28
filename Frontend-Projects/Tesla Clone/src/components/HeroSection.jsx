import React from "react";

import { IoIosArrowDown } from "react-icons/io";
import Fade from "react-reveal/Fade";
import Footer from "./Footer";

const HeroSection = (props) => {
  return (
    <div
      className={`w-[100vw] h-[100vh] ${props.bgImg} bg-cover bg-center bg-no-repeat flex flex-col justify-between items-center `}
    >
      <Fade bottom>
        <div className="p-[15vh] text-center ">
          <h1 className="text-5xl font-semibold mb-3">{props.title}</h1>
          <p
            className={`text-base ${
              props.underline &&
              " border-b-2 border-b-[#000] hover:border-b-[3px] border-b-"
            } `}
          >
            {props.info || ""}{" "}
          </p>
        </div>
      </Fade>
      <div className="flex flex-col items-center gap-3">
        <Fade bottom>
          <div className="flex  gap-6 justify-center  md:flex-row flex-col mb-5">
            <button className="bg-[#000] h-10 w-56 text-white flex justify-center items-center font-medium rounded cursor-pointer  opacity-75">
              {props.buttonLeftText}
            </button>
            {props.buttonRightText && (
              <button className="bg-[#e6e7e5] h-10 w-56 text-[#000] flex justify-center items-center font-medium rounded cursor-pointer opacity-75">
                {props.buttonRightText}
              </button>
            )}
          </div>
        </Fade>
        {props.i ? (
          <Footer/>
        ) : (
          <div className="mt-5 mb-4 animate-arrowDownAnimate">
            <IoIosArrowDown size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
