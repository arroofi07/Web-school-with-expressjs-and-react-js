import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import axios from "axios";

import bg from "../assets/rumah.mp4";
import sky from "../assets/bg2.jpg";
import "../App.css";

function SignUp() {
  const navigate = useNavigate();

  const style = {
    fontSize: "16px",
    borderBottom: "1px solid white",
    boxShadow: "0 0 10px black",
  };

  const [active, setActive] = useState(false);
  function handleClick() {
    setActive(!active);
  }

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleClearInputs = () => {
    if (usernameRef.current) {
      usernameRef.current.value = "";
    }
    if (passwordRef.current) {
      passwordRef.current.value = "";
    }
  };

  const [sucsess, setSucsess] = useState(false);
  const onSubmit = (data) => {
    if (!data.nama || !data.password) {
      alert("Username atau Password Tidak Valid");
      return;
    }

    axios.post("http://localhost:3001/mahasiswa", data).then((response) => {
      setSucsess(true);
      handleClearInputs();
    });
  };

  return (
    <header className="w-full flex items-center justify-center h-[670px] ">
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
        {sucsess && (
          <div
            style={{
              background:
                "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
            }}
            className="  font-serif text-3xl capitalize absolute h-[320px] text-center pt-[80px]  lg:h-[400px] lg:pt-[130px] rounded-2xl  text-black "
          >
            Akun anda berhasil di daftarkan
            <br></br>
            <br></br>
            <p
              style={{ textShadow: "0 0 10px black" }}
              className="text-[18px] font-extralight cursor-pointer hover:text-cyan-300 text-white "
              onClick={() => {
                navigate("/");
              }}
            >
              kembali ke halaman login
            </p>
          </div>
        )}

        <h1
          style={{ textShadow: "0 0 10px red" }}
          className="text-yellow-400  font-extrabold text-[30px] mt-[30px] lg:mt-[56px] font-serif -mb-[60px] "
        >
          NQQ
        </h1>
        <div
          style={{ textShadow: "0 0 9px green" }}
          className="mt-[50px] z-50 text-white text-[18px]"
        >
          <br></br>
          <label htmlFor="username" className="font-serif text-black ">
            Username
          </label>
          <br></br>
          <input
            id="username"
            type="text"
            name="nama"
            ref={usernameRef}
            style={style}
            placeholder="username . . . ."
            required
            autoComplete="off"
            className="pl-[3px] placeholder:font-extralight  focus:placeholder:text-transparent bg-yellow-700 placeholder:text-white   bg-transparent focus:outline-none "
          />
          <br></br>
          <br></br>
          <label htmlFor="password" className="text-black font-serif">
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
            ref={passwordRef}
            style={style}
            placeholder="password . . . ."
            required
            autoComplete="off"
            className="pl-[3px] placeholder:font-extralight  focus:placeholder:text-transparent bg-yellow-700 placeholder:text-white   bg-transparent focus:outline-none "
          />
          <br></br>
          <button
            type="button"
            style={{ boxShadow: "0 0 7px black" }}
            className="text-yellow-200   font-serif  bg-yellow-800 font-extralight hover:text-yellow-800 hover:bg-white mt-[40px] rounded-xl w-[70px] pb-[3.5px] "
            onClick={() =>
              onSubmit({
                nama: usernameRef.current.value,
                password: passwordRef.current.value,
              })
            }
          >
            Register
          </button>
          <Link
            style={{ textShadow: "0 0 10px white" }}
            className="text-black font-serif font-extralight text-[18px] hover:animate-spin ml-[60px] "
            to="/"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default SignUp;
