import React from "react";

import Logo from "/images/logo.svg";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [active, setActive] = React.useState(false);

  return (
    <div className="flex xl:justify-around justify-between  min-h-[60px] fixed items-center py-0 px-5 top-0 left-0 right-0">
      <div className=" mr-8">
        <a href="/">
          <img src={Logo} alt="logo" />
        </a>
      </div>
      <div className="hidden xl:flex font-medium items-center justify-center ">
        <div className="flex-nowrap cursor-pointer hover:bg-[#cad6de] py-1 px-4 rounded hover:bg-opacity-70 transition-all duration-500">
          <a>Model S</a>
        </div>
        <div className="flex-nowrap cursor-pointer hover:bg-[#cad6de] py-1 px-4 rounded hover:bg-opacity-70 transition-all duration-500">
          <a>Model 3</a>
        </div>
        <div className="flex-nowrap cursor-pointer hover:bg-[#cad6de] py-1 px-4 rounded hover:bg-opacity-70 transition-all duration-500">
          <a>Model X</a>
        </div>
        <div className="flex-nowrap cursor-pointer hover:bg-[#cad6de] py-1 px-4 rounded hover:bg-opacity-70 transition-all duration-500">
          <a>Model Y</a>
        </div>
        <div className="flex-nowrap cursor-pointer hover:bg-[#cad6de] py-1 px-4 rounded hover:bg-opacity-70 transition-all duration-500">
          <a>Solar PanelRoof</a>
        </div>
        <div className="flex-nowrap cursor-pointer hover:bg-[#cad6de] py-1 px-4 rounded hover:bg-opacity-70 transition-all duration-500">
          <a>Solar Roof</a>
        </div>
        <div className="flex-nowrap cursor-pointer hover:bg-[#cad6de] py-1 px-4 rounded hover:bg-opacity-70 transition-all duration-500">
          <a> PowerWall</a>
        </div>
      </div>
      <div className="flex  font-medium items-center  ">
        <div className="hidden xl:block flex-nowrap cursor-pointer   hover:bg-[#cad6de] py-1 px-4 rounded hover:bg-opacity-70 transition-all duration-500">
          <a>Shop</a>
        </div>
        <div className=" hidden xl:block flex-nowrap cursor-pointer hover:bg-[#cad6de] py-1 px-4 rounded hover:bg-opacity-70 transition-all duration-500">
          <a>Account</a>
        </div>
        <div
          className="flex-nowrap cursor-pointer bg-[#b2b5b7] bg-opacity-70 xl:bg-transparent hover:bg-[#cad6de] py-1 px-4 rounded hover:bg-opacity-70 transition-all duration-500"
          onClick={() => setActive(true)}
        >
          <a>Menu</a>
        </div>
      </div>
      <Sidebar active={active} onSetActive={setActive} />
    </div>
  );
};

export default Navbar;
