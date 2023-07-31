import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/rumah.mp4";
import sky from "../assets/bg2.jpg";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function LoginAdmin() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [namaAdmin, setNamaAdmin] = useState("");
  const [passwordAdmin, setPasswordAdmin] = useState("");

  // ini login sebagai admin
  const loginAdmin = () => {
    const dataAdmin = { nama: namaAdmin, password: passwordAdmin };
    axios
      .post("http://localhost:3001/admin/login", dataAdmin)
      .then((response) => {
        if (response.data.error) {
          alert("Anda Tidak Memiliki Akses Untuk Login Sebagai Admin");
        } else {
          alert("you  loggin");
          Cookies.set("isLoggedIn", "true", { expires: 30 }); // Cookie akan berakhir dalam 7 hari
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem(
            "secretKey",
            "utawl,454.244,421,3233445,5678,7844534432423423492348.454,34243"
          );
          // localStorage.setItem("userId", response.data.id);
          navigate("/admin/home");
        }
      });
  };

  const style = {
    fontSize: "16px",
    borderBottom: "1px solid white",
    boxShadow: "0 0 10px black",
  };

  function handleClick() {
    setActive(!active);
  }
  return (
    <header
      style={{ textShadow: "0 0 10px black" }}
      className="w-full flex items-center  justify-center h-[670px] "
    >
      <video
        src={bg}
        className="object-cover h-[670px]  "
        loop
        autoPlay
        muted
      />
      <div
        id="login"
        style={{
          backgroundImage: `url(${sky})`,
          backgroundSize: "150%",
          backgroundRepeat: "no-repeat",
          textShadow: "0 0 9px green",
        }}
        className="w-[85%]  h-[320px]  inline-block text-center items-center justify-center rounded-2xl bg-black absolute  lg:w-[35%] lg:h-[400px] "
      >
        <Link
          to="/"
          style={{ boxShadow: "0 0 10px white" }}
          className="bg-yellow-400 z-50  hover:bg-yellow-700 flex justify-center items-center absolute left-[150px] lg:left-[440px]   text-[30px] w-[45px]  h-[45px] animate-bounce hover:animate-none mt-[380px] lg:mt-1 rounded-xl    right-4 border-[2px] border-opacity-50 border-yellow-400  "
        >
          <FaUser />
        </Link>
        <h1
          style={{ textShadow: "0 0 10px red" }}
          className="text-yellow-400  font-extrabold text-[30px] mt-[30px] lg:mt-[56px] font-serif -mb-[60px] "
        >
          ADMIN
        </h1>

        <br></br>
        <div className="mt-[50px] z-50 text-black font-extralight font-serif text-[18px]">
          <label for="username" className="font-serif  ">
            Username
          </label>
          <br></br>
          <input
            type="text"
            id="username"
            name="username"
            style={style}
            placeholder="username . . . ."
            required
            autoComplete="off"
            className="pl-[3px] placeholder:font-extralight text-white focus:placeholder:text-transparent bg-yellow-700 placeholder:text-white   bg-transparent focus:outline-none "
            onChange={(event) => {
              setNamaAdmin(event.target.value);
            }}
          />
          <br></br>
          <br></br>
          <label for="password" className="font-serif">
            Password
          </label>
          <br></br>
          <h1
            onClick={handleClick}
            className="text-xl ml-[260px] lg:ml-[320px] hover:text-white cursor-pointer w-7 lg:z-50  -mb-6 mt-[2px] z-50 "
          >
            {active ? <AiFillEye /> : <AiFillEyeInvisible />}
          </h1>
          <input
            id="password"
            type={active ? "text" : "password"}
            name="password"
            style={style}
            placeholder="password . . . ."
            required
            autoComplete="off"
            className="pl-[3px] placeholder:font-extralight text-white focus:placeholder:text-transparent bg-yellow-700 placeholder:text-white   bg-transparent focus:outline-none "
            onChange={(event) => {
              setPasswordAdmin(event.target.value);
            }}
          />
          <br></br>
          <button
            type="submit"
            style={{ boxShadow: "0 0 7px black" }}
            className="text-yellow-200  font-serif  bg-yellow-800 font-extralight hover:text-yellow-600 hover:bg-white mt-[40px] rounded-xl w-[70px] pb-[3.5px] "
            onClick={loginAdmin}
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default LoginAdmin;
