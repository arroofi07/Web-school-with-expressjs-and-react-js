import React, { useEffect, useState } from "react";
import axios from "axios";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

const TambahNilaiMahasiswa = () => {
  const [dataMahasiswa, setDataMahasiswa] = useState([]);

  useEffect(() => {
    fetchDataMahasiswa();
  }, []);

  const fetchDataMahasiswa = async () => {
    try {
      const response = await axios.get("http://localhost:3001/mahasiswa");
      setDataMahasiswa(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data mahasiswa", error);
    }
  };

  const handleTambahNilai = async (nama, kategori) => {
    try {
      await axios.post(`http://localhost:3001/mahasiswa/${nama}/tambah-nilai`, {
        kategori,
        nilai: 1,
      });
      fetchDataMahasiswa(); // Ambil data mahasiswa terbaru setelah nilai diperbarui
    } catch (error) {
      console.error("Terjadi kesalahan saat menambahkan nilai", error);
    }
  };

  return (
    <div>
      <div className="mt-56 space-y-6 inline-block  justify-center items-center  w-full h-[1150px]    ">
        {dataMahasiswa.map((mahasiswa, index) => (
          <ul
            style={{ boxShadow: "0 0 10px black" }}
            key={index}
            className="space-y-2 text-white text-center bg-yellow-700 pl-10   w-[80%] ml-[39px] rounded-2xl h-[230px]  "
          >
            <li className="text-[23px] font-serif pt-5 -ml-[20%] capitalize text-black font-bold ">
              {mahasiswa.nama}
            </li>
            <li className="flex space-x-3">
              <h1 className="pr-6">Kehadiran</h1>
              <button
                className="  hover:text-black hover:animate-bounce  "
                onClick={() => handleTambahNilai(mahasiswa.nama, "kehadiran")}
              >
                <TbSquareRoundedPlusFilled />
              </button>
              <b></b>
              <b></b>
              <p>{mahasiswa.kehadiran}</p>
            </li>
            <li className="flex  space-x-3">
              <h1 className="pr-[53px]">Tugas</h1>
              <button
                className="  hover:text-black hover:animate-bounce  "
                onClick={() => handleTambahNilai(mahasiswa.nama, "tugas")}
              >
                <TbSquareRoundedPlusFilled />
              </button>
              <b></b>
              <b></b>
              <p> {mahasiswa.tugas}</p>
            </li>
            <li className="flex space-x-3">
              <h1 className="pr-[25px]">Partisipasi</h1>
              <button
                className="  hover:text-black hover:animate-bounce  "
                onClick={() => handleTambahNilai(mahasiswa.nama, "partisipasi")}
              >
                <TbSquareRoundedPlusFilled />
              </button>
              <b></b>
              <b></b>
              <p>{mahasiswa.partisipasi}</p>
            </li>
            <li className="flex space-x-3">
              <h1 className="pr-[3px]">Tugas Online</h1>
              <button
                className="  hover:text-black hover:animate-bounce  "
                onClick={() =>
                  handleTambahNilai(mahasiswa.nama, "penugasan_online")
                }
              >
                <TbSquareRoundedPlusFilled />
              </button>
              <b></b>
              <b></b>
              <p>{mahasiswa.penugasan_online}</p>
            </li>
            <li className="flex space-x-3">
              <h1 className="pr-[64px]">Quiz</h1>
              <button
                className="  hover:text-black hover:animate-bounce  "
                onClick={() => handleTambahNilai(mahasiswa.nama, "quiz")}
              >
                <TbSquareRoundedPlusFilled />
              </button>
              <b></b>
              <b></b>
              <p>{mahasiswa.quiz}</p>
            </li>
          </ul>
        ))}
        <div className="space-y-2 text-white bg-transparent pl-7  w-[80%] ml-[39px] rounded-2xl h-[90px]  "></div>
      </div>
    </div>
  );
};

export default TambahNilaiMahasiswa;
