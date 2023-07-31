import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import AddStory from "../components/AddStory";
import ListStory from "../components/ListStory";
import { IoMdNavigate } from "react-icons/io";

function Talk() {
  // fungsi agar kembali ke halaman paling atas dari layar
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div id="talk" className=" font-serif  ">
      <nav
        style={{
          boxShadow: "0 0 10px white",
          background:
            "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
        }}
        className=" z-40 w-full h-[65px] fixed  "
      >
        <h1 className="text-[35px] text-white  ml-3 mt-4  w-8 hover:text-black ">
          <Link to="/home">
            <MdOutlineKeyboardBackspace />
          </Link>
        </h1>
        {/*  */}
        {/* kembali ke paling atas halaman */}
        <div
          className="hover:bg-yellow-400 bg-black text-yellow-500 hover:text-black cursor-pointer flex justify-center items-center  text-[30px] w-[45px] h-[45px] rounded-xl fixed z-50 mt-[-40px] right-4 border-[2px]  border-opacity-50 border-black  "
          onClick={handleScrollToTop}
        >
          <IoMdNavigate />
        </div>
      </nav>

      {/* content */}
      <AddStory />
      <ListStory />
      <p className="h-[100px] "></p>
    </div>
  );
}

export default Talk;
