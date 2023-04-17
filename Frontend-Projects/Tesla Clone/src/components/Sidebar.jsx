import React from "react";

import { VscGlobe } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";

const Sidebar = (props) => {
  return (
    <div
      className={`fixed top-0 bottom-0 right-0 bg-white w-[308px] z-10 p-5 font-medium flex flex-col text-start overflow-auto ${
        props.active == true ? "translate-x-0" : "translate-x-full"
      }  transition-all duration-500`}
    >
      <ul className="ml-4">
        <li className="py-2 px-2 cursor-pointer  ">
          <div className="flex justify-end ">
            <RxCross2
              size={36}
              className="hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 p-2"
              onClick={() => props.onSetActive(false)}
            />
          </div>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Existing Inventory</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Used Inventory</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Trade-In</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Demo Drive</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Insurance</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Cybertruck</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Roadster</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Semi</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Charging</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Commercial Energy</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Utilities</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Find Us</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Support</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <a href="#">Investor Relations</a>
        </li>
        <li className="py-2 px-2 cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded transition-all duration-500 ">
          <div className="flex items-center gap-2">
            <VscGlobe size={24} />
            <div>
              <h3>United Stated</h3>
              <p className="text-sm text-gray-500 font-medium">English</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
