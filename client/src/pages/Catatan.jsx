import React from "react";
import TodoList from "../components/TodoList";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdNavigate } from "react-icons/io";

function Catatan() {
  // kembali ke layar paling atas
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className=" w-full inline-block justify-center items-center text-center  ">
      <nav
        style={{
          boxShadow: "0 0 10px white",
          background:
            "linear-gradient(90deg, rgba(77,70,0,1) 0%, rgba(255,192,0,1) 100%)",
        }}
        className=" z-40 w-full h-[65px] fixed  bg-transparent "
      >
        <h1 className="text-[35px] ml-3 mt-4  w-8 hover:text-black text-white ">
          <Link to="/home">
            <MdOutlineKeyboardBackspace />
          </Link>
        </h1>
        {/*  */}
        {/* kembali ke paling atas halaman */}
        <div
          className="hover:bg-yellow-400 text-yellow-500 hover:text-black bg-black flex cursor-pointer  justify-center items-center  text-[30px] w-[45px] h-[45px] rounded-xl fixed z-50 mt-[-40px] right-4 border-[2px]  border-opacity-50 border-black  "
          onClick={handleScrollToTop}
        >
          <IoMdNavigate />
        </div>
      </nav>
      <TodoList />
      <p className="h-10 "></p>
    </div>
  );
}

export default Catatan;
