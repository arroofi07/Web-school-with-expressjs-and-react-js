import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { IoMdNavigate } from "react-icons/io";

function DiagramBatang() {
  const chartRefs = useRef([]); // Menggunakan array refs untuk menyimpan referensi ke semua diagram
  const [dataNilai, setDataNilai] = useState([]);

  // Mengambil data dari database
  useEffect(() => {
    axios
      .get(`http://localhost:3001/mahasiswa`)
      .then((response) => {
        setDataNilai(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Membuat diagram batang untuk setiap pengguna
  useEffect(() => {
    if (dataNilai.length > 0) {
      // Membersihkan diagram yang ada sebelumnya jika ada
      chartRefs.current.forEach((chart) => {
        chart.destroy();
      });

      // Membuat diagram batang untuk setiap pengguna
      chartRefs.current = dataNilai.map((item, index) => {
        const ctx = document
          .getElementById(`myChart-${index}`)
          .getContext("2d");
        const chartRef = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "Kehadiran",
              "Tugas",
              "Partisipasi",
              "TugasOnline",
              "Quiz",
            ],
            datasets: [
              {
                label: "Nilai",
                data: [
                  item.kehadiran,
                  item.tugas,
                  item.partisipasi,
                  item.penugasan_online,
                  item.quiz,
                ],
                backgroundColor: "cyan",
                borderColor: "black",
                borderWidth: 2,
              },
            ],
          },
          options: {
            scales: {
              x: {
                ticks: {
                  color: "cyan", // Warna teks label disini
                },
              },
              y: {
                ticks: {
                  color: "cyan", // Warna teks label disini
                },
              },
            },
          },
        });

        return chartRef;
      });
    }
  }, [dataNilai]);

  // fungsi agar kembali ke halaman paling atas dari layar
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="diagram-nilai">
      <nav
        style={{
          boxShadow: "0 0 10px white",
          background:
            "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
        }}
        className="z-40 w-full h-[65px] fixed bg-yellow-700 bg-transparent"
      >
        <h1 className="text-[35px] text-white ml-3 mt-4 w-8 hover:text-black">
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

      {/*content  */}
      <div className="pt-[110px] font-serif space-y-7 ">
        <h1 className="capitalize text-[22px] items-center text-center text-white">
          <Typewriter
            options={{
              strings: ["Presentase nilai"],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        {/*  */}
        {dataNilai.map((item, index) => (
          <div
            key={index}
            style={{
              boxShadow: "0 0 10px black ",
              background:
                "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
            }}
          >
            <h1 className="text-black text-[20px] text-center pl-5 capitalize font-extrabold ">
              {item.nama}
            </h1>
            <canvas id={`myChart-${index}`} />
          </div>
        ))}
        <p className="h-1 bg-transparent text-transparent "></p>
      </div>
    </div>
  );
}

export default DiagramBatang;
