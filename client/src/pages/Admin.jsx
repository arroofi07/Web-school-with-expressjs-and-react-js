import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  TbSquareRoundedMinus,
  TbSquareRoundedPlusFilled,
} from "react-icons/tb";
import { IoMdNavigate } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const TambahNilaiMahasiswa = () => {
  const [dataMahasiswa, setDataMahasiswa] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmLogout, setConfirmLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataMahasiswa();
  }, []);

  // tangkap semua data pada tabel mahasiswas
  const fetchDataMahasiswa = async () => {
    try {
      const response = await axios.get("http://localhost:3001/mahasiswa");
      setDataMahasiswa(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data mahasiswa", error);
    }
  };

  // fungsi untuk menambah nilai
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

  // fungsi untuk mengurangi nilai
  const handleKurangNilai = async (nama, kategori) => {
    try {
      await axios.post(`http://localhost:3001/mahasiswa/${nama}/kurang-nilai`, {
        kategori,
        nilai: 1,
      });
      fetchDataMahasiswa();
    } catch (err) {
      console.log(err);
    }
  };

  // mnghitung jumlah  semua data nilai
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

  const filteredMahasiswa = useMemo(() => {
    // total point
    const daftarTotalPoinSiswa = hitungTotalPoint(dataMahasiswa);

    // mengurutkan data nilai dari jumlah paling banyak
    // daftarTotalPoinSiswa.sort((a, b) => b.totalPoint - a.totalPoint);

    // baris livesearch
    return daftarTotalPoinSiswa.filter((mahasiswa) =>
      mahasiswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [dataMahasiswa, searchTerm]);

  // fungsi agar kembali ke halaman paling atas dari layar
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // fungsi logout
  const handleLogout = () => {
    // Hapus cookie isLoggedIn
    Cookies.remove("isLoggedIn");

    // Hapus data sesi (misalnya, accessToken)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("secretKey");

    // Alihkan pengguna ke halaman Login
    navigate("/admin");
  };

  // konfirmasi ;logout
  function konfirmasiLogout() {
    setConfirmLogout(!confirmLogout);
  }
  function confirmLogoutClickOff() {
    setConfirmLogout(false);
  }

  return (
    <div>
      {confirmLogout && (
        <div
          style={{
            opacity: "0.9",
            boxShadow: "0 0 10px white",
          }}
          className=" inline-block justify-center items-center pt-[40px] font-serif text-center bg-yellow-700 w-[70%] h-[150px] fixed ml-[60px] rounded-xl z-40 top-[270px] lg:w-[50%] lg:ml-[285px]  "
        >
          <p className="text-[19px] text-black font-extralight ">
            Anda yakin mau logout
          </p>
          <br></br>
          <button
            onClick={handleLogout}
            className="mr-12 bg-black text-yellow-500 rounded-xl w-16  hover:text-white "
          >
            Ya
          </button>
          <button
            onClick={confirmLogoutClickOff}
            className="bg-black rounded-xl w-16 text-yellow-500 hover:text-white "
          >
            Tidak
          </button>
        </div>
      )}
      {/*  */}
      <div
        id="navigasiHome"
        className="bg-yellow-400 z-50 cursor-pointer lg:ml-5 hover:text-yellow-500 hover:bg-black flex justify-center items-center relative left-[11px]  text-[30px] w-[45px] h-[45px] mt-[15px] rounded-xl    right-4 border-[2px] border-opacity-50 border-yellow-400  "
        onClick={konfirmasiLogout}
      >
        <BiLogOut />
      </div>
      <div
        id="navigasiHome"
        className="bg-yellow-400 z-50 cursor-pointer flex justify-center lg:mt-[-45px] items-center hover:text-yellow-500 hover:bg-black  text-[30px] w-[45px] h-[45px] mt-[610px] rounded-xl fixed   right-4 border-[2px] border-opacity-50 border-yellow-400  "
        onClick={handleScrollToTop}
      >
        <IoMdNavigate />
      </div>
      <div className="flex items-center mt-[30px] justify-center">
        <input
          type="text"
          value={searchTerm}
          style={{
            border: "2px solid white",
            boxShadow: "0 0 10px skyblue",
          }}
          className="rounded-[8px] pl-1 outline-none bg-sky-500 placeholder:text-black focus:placeholder-transparent w-[210px] lg:w-[30%] "
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari nama"
        />
      </div>

      <div className="mt-10 space-y-6 inline-block  justify-center items-center  w-full h-[1150px] lg:w-[50%] lg:ml-[310px]    ">
        {filteredMahasiswa.map((mahasiswa, index) => (
          <ul
            style={{ boxShadow: "0 0 10px black", border: "1px solid white" }}
            key={index}
            className="space-y-2 text-white text-center bg-yellow-700 pl-6   w-[80%] ml-[39px] rounded-2xl h-auto lg:pl-[100px]  "
          >
            <li className="text-[23px] font-serif pt-5 -ml-[11%] lg:ml-[-100px]  capitalize text-black font-bold ">
              {mahasiswa.nama}
            </li>
            <li className="flex space-x-4 lg:ml-[10px] ">
              <h1 className="pr-6 ">Kehadiran</h1>
              <button
                className="  hover:text-black active:animate-ping "
                onClick={() => handleKurangNilai(mahasiswa.nama, "kehadiran")}
              >
                <TbSquareRoundedMinus />
              </button>
              <button
                className="  hover:text-black active:animate-ping text-cyan-400  "
                onClick={() => handleTambahNilai(mahasiswa.nama, "kehadiran")}
              >
                <TbSquareRoundedPlusFilled />
              </button>
              <b></b>
              <b></b>
              <p>{mahasiswa.kehadiran}</p>
            </li>
            <li className="flex  space-x-4 lg:ml-[10px] ">
              <h1 className="pr-[53px] ">Tugas</h1>
              <button
                className="  hover:text-black active:animate-ping  "
                onClick={() => handleKurangNilai(mahasiswa.nama, "tugas")}
              >
                <TbSquareRoundedMinus />
              </button>
              <button
                className="  hover:text-black active:animate-ping text-cyan-400  "
                onClick={() => handleTambahNilai(mahasiswa.nama, "tugas")}
              >
                <TbSquareRoundedPlusFilled />
              </button>
              <b></b>
              <b></b>
              <p> {mahasiswa.tugas}</p>
            </li>
            <li className="flex space-x-4 lg:ml-[10px] ">
              <h1 className="pr-[25px] ">Partisipasi</h1>
              <button
                className="  hover:text-black active:animate-ping  "
                onClick={() => handleKurangNilai(mahasiswa.nama, "partisipasi")}
              >
                <TbSquareRoundedMinus />
              </button>
              <button
                className="  hover:text-black active:animate-ping text-cyan-400  "
                onClick={() => handleTambahNilai(mahasiswa.nama, "partisipasi")}
              >
                <TbSquareRoundedPlusFilled />
              </button>
              <b></b>
              <b></b>
              <p>{mahasiswa.partisipasi}</p>
            </li>
            <li className="flex space-x-4 lg:ml-[10px] ">
              <h1 className="pr-[3px] ">Tugas Online</h1>
              <button
                className="  hover:text-black active:animate-ping  "
                onClick={() =>
                  handleKurangNilai(mahasiswa.nama, "penugasan_online")
                }
              >
                <TbSquareRoundedMinus />
              </button>
              <button
                className="  hover:text-black active:animate-ping text-cyan-400  "
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
            <li className="flex space-x-4 lg:ml-[10px] ">
              <h1 className="pr-[64px] ">Quiz</h1>
              <button
                className="  hover:text-black active:animate-ping  "
                onClick={() => handleKurangNilai(mahasiswa.nama, "quiz")}
              >
                <TbSquareRoundedMinus />
              </button>
              <button
                className="  hover:text-black active:animate-ping text-cyan-400  "
                onClick={() => handleTambahNilai(mahasiswa.nama, "quiz")}
              >
                <TbSquareRoundedPlusFilled />
              </button>
              <b></b>
              <b></b>
              <p>{mahasiswa.quiz}</p>
            </li>
            <li className="flex  -space-x-10 pt-4 lg:ml-[10px]  font-serif font-bold text-black ">
              <h1 className="pr-[53px]">Total Point:</h1>
              <p> {mahasiswa.totalPoint}</p>
            </li>
            <p className="h-2"></p>
          </ul>
        ))}
        <div className="space-y-2 text-white bg-transparent pl-7  w-[80%] ml-[39px] rounded-2xl h-[10px]  "></div>
      </div>
      {/*  */}
    </div>
  );
};

export default TambahNilaiMahasiswa;
