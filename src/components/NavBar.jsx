import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";





const navTag = [
  { label: "Home", to: "/home" },
  { label: "NIT Jamshedpur", to: "https://nitjsr.ac.in/" },
  { label: "Contact Us", to: "/contactus" },
  { label: "About", to: "/about" },
];

function NavBar({isLoggedIn , sign1 }) {
 
  return (
    <>

      <div className="h-[60px] bg-[#015cee] flex border-b border-blue-700/40 justify-between shadow-lg shadow-blue-950/10 px-3 sm:px-6">
        <Link to="/home" className="flex h-full min-w-0 items-center gap-3 text-white">
          <img
            src="../need/logo3 (2).png "
            className="h-full w-20 sm:w-28 object-contain"
          ></img>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm sm:text-lg font-bold">
              NIT Jamshedpur
            </p>
            <p className="truncate text-[11px] sm:text-xs font-medium text-blue-100">
              CGPA Analyzer
            </p>
          </div>
        </Link>

        <div className="h-full flex flex-1 justify-end text-white items-center gap-3">
          <div className="hidden h-full md:flex flex-1 max-w-xl justify-around items-center text-sm lg:text-base font-medium">
            {navTag.map(({ label, to }) => (
              <div  key={label} >
                <Link
                  to={to}
                  className="rounded-full px-3 py-2 transition hover:bg-white/15"
                 
                  target={label === "NIT Jamshedpur" ? "_blank" : "_self"}
                  rel={label === "NIT Jamshedpur" ? "noopener noreferrer" : ""}
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>

          { !sign1 && (
            <div className="h-full flex justify-center items-center">
            <Link to="/login" className="h-full flex justify-center items-center">
              <button className="bg-white text-[#015cee] h-10 px-4 sm:px-5 rounded-full mt-0.5 text-sm font-semibold shadow-sm transition hover:bg-blue-50">
                Sign in
              </button>
            </Link>
          </div>
          )}
          
        </div>
      </div>
    </>
  );
}

export default NavBar;
