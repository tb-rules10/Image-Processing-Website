import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppName, Menus } from "../data";
import ControlImage from '../assets/control.png';  
import LogoImage from '../assets/logo.png';   
import PropTypes from 'prop-types';


function SideNav({ path }) {

  SideNav.propTypes = {
    path: PropTypes.number,
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [expandStates, setExpandStates] = useState(Array(3).fill(false));

  const toggleExpand = (index, path) => {
    if (!location.pathname.startsWith(path)) {
      navigate(path);
    }
    const newExpandStates = [...expandStates];
    newExpandStates[index] = !newExpandStates[index];
    setExpandStates(newExpandStates);
    console.log(newExpandStates);
  };

  useEffect(() => {
    if (!open) {
      setExpandStates(Array(3).fill(false));
    }
  }, [open]);

  useEffect(() => {
    if(path != null){
      const newExpandStates = [...expandStates];
      newExpandStates[path] = true;
      setExpandStates(newExpandStates);
      console.log(newExpandStates);
    }
  }, []);

  useEffect(() => {
    console.log("triggered")
    const newExpandStates = Menus.map((menu) =>
      location.pathname.startsWith(menu.path)
    );
    newExpandStates[path] = true;
    setExpandStates(newExpandStates);
    console.log(newExpandStates);
  }, [location.pathname]);

  // useEffect(() => {
  //   const newExpandStates = [...expandStates];
  //   newExpandStates[path] = true;
  //   setExpandStates(newExpandStates);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [path]);

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
    >
      <img
        src={ControlImage}  // Use ControlImage
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
         border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
        alt="Control"
      />
      <div className="flex gap-x-4 items-center">
        <img
          src={LogoImage}  // Use LogoImage
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          alt="Logo"
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          {AppName}
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            onClick={() => toggleExpand(index, Menu.path)}
            key={index}
            className={`flex-y  rounded-md p-2 cursor-pointer ${
              !open && "hover:bg-light-white"
            } ${
              open && !expandStates[index] && 
              "hover:box-border hover:border-2 hover:border-light-white "
            }
            ${Menu.gap ? "mt-9wa" : "mt-2"} ${
              expandStates[index] && 
              "bg-light-white"
            } `}
          >
            <div className="flex text-gray-300 text-sm items-center gap-x-4">
              <img src={Menu.src} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </div>
            {expandStates[index] && (
              <ul className="ml-5 mt-2 list-disc text-white">
                {Menu.submenu.map((submenuItem, subIndex) => (
                  <li 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(submenuItem.submenuPath);
                  }}
                  className="hover:underline py-1" key={subIndex}>
                    {submenuItem.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNav;
