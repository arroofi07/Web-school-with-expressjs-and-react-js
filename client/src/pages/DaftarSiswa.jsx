import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdNavigate } from "react-icons/io";

function DaftarSiswa() {
  const [daftarsiswa, setDaftarSiswa] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/mahasiswa").then((response) => {
      setDaftarSiswa(response.data);
    });
  }, []);

  // fungsi agar kembali ke halaman paling atas dari layar
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // baris untuk mengurutkan total point user yang paling tinggi
  const hitungTotalPoint = (data) => {
    return data.map((item) => {
      const totalPoint =
        item.kehadiran +
        item.tugas +
        item.partisipasi +
        item.penugasan_online +
        item.quiz;

      return {
        ...item,
        totalPoint: totalPoint,
      };
    });
  };

  const daftarTotalPoinSiswa = hitungTotalPoint(daftarsiswa);
  // urutkan  data
  daftarTotalPoinSiswa.sort((a, b) => b.totalPoint - a.totalPoint);

  return (
    <div id="daftarsiswa" className="w-full  font-serif  ">
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
        {/*  */}
        {/* kembali ke paling atas halaman */}
        <div
          className="hover:bg-yellow-400 text-yellow-500 hover:text-black bg-black flex cursor-pointer  justify-center items-center  text-[30px] w-[45px] h-[45px] rounded-xl fixed z-50 mt-[-40px] right-4 border-[2px]  border-opacity-50 border-black  "
          onClick={handleScrollToTop}
        >
          <IoMdNavigate />
        </div>
      </nav>

      <div className=" mt-[100px] w-full space-y-5 inline-block justify-center items-center  text-center ">
        {daftarTotalPoinSiswa.map((listData, index) => (
          <ul
            key={index}
            style={{
              boxShadow: "0 0 10px black ",
              background:
                "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
            }}
            className=" space-y-2 text-black font-extralight w-[80%] items-center rounded-xl ml-[37px] lg:ml-[110px] "
          >
            <p className="h-1 bg-transparent text-transparent "></p>
            <li className="absolute text-[20px] ml-3 text-black font-serif font-bold  ">
              {index + 1}
            </li>
            <li className="pb-2 text-[20px] capitalize text-black font-bold ">
              {listData.nama}
            </li>
            <li>
              <span className="text-black capitalize mr-1 ">Kehadiran:</span>
              {listData.kehadiran} point
            </li>
            <li>
              <span className="text-black capitalize mr-1 ">Tugas:</span>
              {listData.tugas} point
            </li>
            <li>
              <span className="text-black capitalize mr-1">Partisipasi:</span>
              {listData.partisipasi} point
            </li>
            <li>
              <span className="text-black capitalize mr-1 ">Tugas online:</span>
              {listData.penugasan_online} point
            </li>
            <li>
              <span className="text-black capitalize mr-1 ">Quiz:</span>
              {listData.quiz} point
            </li>
            <li className="font-bold">Total: {listData.totalPoint} Point</li>
            <p className="h-1 bg-transparent text-transparent "></p>
          </ul>
        ))}
        <p className="h-1 bg-transparent text-transparent "></p>
      </div>
    </div>
  );
}

export default DaftarSiswa;
