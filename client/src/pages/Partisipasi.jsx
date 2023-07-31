import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
// import { object } from "yup";

function Partisipasi() {
  const [mahasiswa, setMahasiswa] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://localhost:3001/mahasiswa/user", {
        headers: {
          Authorization: `Bearer ${accessToken} `,
        },
      })
      .then((response) => {
        // Memastikan respons dari server adalah array sebelum disimpan di state
        const responseData = response.data.isi || {};
        setMahasiswa(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className=" w-full h-[100vh] text-white  ">
      <nav
        style={{
          boxShadow: "0 0 10px white",
          background:
            "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
        }}
        className=" z-40 w-full h-[65px] fixed bg-yellow-700 bg-transparent "
      >
        <h1 className="text-[35px] text-white  ml-3 mt-4  w-8 hover:text-black ">
          <Link to="/home">
            <MdOutlineKeyboardBackspace />
          </Link>
        </h1>
      </nav>
      <div>
        {Object.keys(mahasiswa).length > 0 ? (
          <ul
            style={{
              boxShadow: "0 0 10px black ",
              background:
                "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
            }}
            className="text-black text-[30px] absolute text-center pt-[50px] mt-[200px] font-serif capitalize w-[80%] h-[200px] items-center rounded-xl ml-[37px] lg:w-[50%] lg:ml-[270px]  "
          >
            <li>Nama: {mahasiswa.nama}</li>
            <li>Partisipasi: {mahasiswa.partisipasi}</li>
          </ul>
        ) : (
          <h1>data tidak tampil</h1>
        )}
      </div>
    </div>
  );
}

export default Partisipasi;
