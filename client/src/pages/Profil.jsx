import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Profil() {
  const [profil, setProfil] = useState("");
  const [listProfil, setListProfil] = useState({});
  const [updateProfil, setUpdateProfil] = useState(null);
  const [show, setShow] = useState(false);
  const [notif, setNotif] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [listMahasiswa, setListMahasiswa] = useState({});
  const [confirmHapus, setConfirmHapus] = useState(false);
  // const [deleteProfil, setDeleteProfil] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:3001/mahasiswa/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = response.data.isi || {};
        // console.log(responseData);
        setListMahasiswa(responseData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeHandler = (e) => {
    setProfil(e.target.files[0]);
  };

  const addProfil = async (e) => {
    e.preventDefault();
    if (!profil) {
      alert("pilih file terlebih dahulu!!");
      return;
    }

    //
    try {
      console.log("Mengunggah file:", profil);

      const formData = new FormData();
      formData.append("potoProfil", profil);
      const response = await axios.post(
        "http://localhost:3001/profil",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Tambahkan header Content-Type sebagai 'multipart/form-data'
          },
        }
      );

      console.log("Respons dari server:", response.data);
      setNotif(true);
      setShow(false);
      setNotifMessage("Photo anda berhasil  di unggah");
    } catch (error) {
      console.log("Terjadi kesalahan:", error);
    }
  };

  // ini baris update poto profil
  const handleUpdateChange = (e) => {
    setUpdateProfil(e.target.files[0]);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateProfil) {
      alert("pilih file terlebih dahulu!!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("potoProfil", updateProfil);

      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.put(
        "http://localhost:3001/profil/update",
        formData,
        config
      );
      console.log(response.data);
      setNotif(true);
      setShow(false);
      setNotifMessage("Photo anda berhasil di ganti");
    } catch (error) {
      console.log(error.response.data); // Pesan error dari server
    }
  };

  //
  // baris untuk mendapatkan data dari database Profils
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:3001/profil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setListProfil(response.data); // Menggunakan setListProfil untuk mengatur state komponen
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile(); // Panggil fungsi untuk mengambil data profil ketika komponen di-mount
  }, []);

  //
  // ini baris untuk menghapus poto profil
  const HandlerDeleteProfil = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete("http://localhost:3001/profil/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProfile(); // Setelah menghapus foto, panggil kembali fungsi untuk mengambil data profil terbaru
      setNotif(true);
      setShow(false);
      setConfirmHapus(false);
      setNotifMessage("Photo anda berhasil di hapus");
    } catch (error) {
      console.log(error);
    }
  };

  // ini fungsi untuk merefresh halaman

  // baris untuk menampilkan input saat  iamgae di klik
  function tampil() {
    setShow(!show);
    setConfirmHapus(false);
  }
  function close() {
    setShow(false);
  }

  function notifConfirmUnggah() {
    window.location.reload();
  }

  function tampilConfirmHapus() {
    setConfirmHapus(!confirmHapus);
    setShow(false);
  }
  function hilangConfirmHapus() {
    setConfirmHapus(!confirmHapus);
  }

  return (
    <div className="w-full h-[80vh]">
      <nav
        style={{
          boxShadow: "0 0 10px white",
          background:
            "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
        }}
        className=" z-40 w-full h-[65px] fixed top-0 bg-yellow-700 bg-transparent "
      >
        <h1 className="text-[35px] text-white  ml-3 mt-4  w-8 hover:text-black ">
          <Link to="/home">
            <MdOutlineKeyboardBackspace />
          </Link>
        </h1>
      </nav>
      {/* ini tampil potoProfil */}
      <div
        id="box-image"
        onClick={tampil}
        className="bg-yellow-500  items-center w-[150px] rounded-[80px] cursor-pointer h-[150px] ml-5 mt-[100px]"
      >
        {Object.keys(listProfil).length > 0 ? (
          <div className="flex justify-center items-center h-full cursor-pointer ">
            <img
              className="object-cover w-[145px]  h-[145px] rounded-full"
              src={`http://localhost:3001/uploads/${listProfil.potoProfil}`}
              alt="Profil"
            />
          </div>
        ) : (
          <p className="text-center cursor-pointer pt-[60px] font-serif font-bold text-xl ">
            Photo
          </p>
        )}
      </div>

      {/*  */}
      {Object.keys(listMahasiswa).length > 0 && (
        <ul className=" text-[30px] font-serif font-bold  text-yellow-500 capitalize relative w-[48%] left-[200px] mt-[-100px] ">
          <li>{listMahasiswa.nama}</li>
        </ul>
      )}
      {/*  */}
      {show && (
        <>
          {/* // ini update potoProfil */}
          {listProfil.potoProfil &&
          Object.keys(listProfil.potoProfil).length > 0 ? (
            <div
              style={{
                boxShadow: "0 0 10px white",
                background:
                  "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
              }}
              className="fixed top-[300px] w-[80%]  inline-block justify-center  items-center left-[35px] rounded-xl pl-[118px] pt-2 lg:mt-[-90px] lg:w-[50%] lg:pr-[100px] lg:ml-[240px]  "
            >
              <h1
                className="text-[23px] ml-[158px] lg:ml-[430px] cursor-pointer hover:text-red-500"
                onClick={close}
              >
                <AiFillCloseCircle />
              </h1>
              <label className="text-center lg:ml-[90px] -ml-[42px] mt-2 capitalize font-serif font-bold text-[20px] ">
                Ganti Photomu
              </label>
              <input
                type="file"
                onChange={handleUpdateChange}
                className=" mt-5 text-transparent lg:ml-[135px]  "
              />
              <button
                className="mt-6 bg-black lg:ml-[135px] rounded-xl hover:animate-bounce text-yellow-400 w-[80px] "
                onClick={handleUpdate}
              >
                Unggah
              </button>
              <p className="h-3  "></p>
            </div>
          ) : (
            // ini baris unggah potoProfil
            <div
              style={{
                boxShadow: "0 0 10px white",
                background:
                  "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
              }}
              className="fixed top-[300px] lg:w-[50%] lg:pr-[100px] lg:ml-[200px] lg:mt-[-60px] w-[80%] inline-block justify-center  items-center left-[35px] rounded-xl pl-[118px] pt-2  "
            >
              <h1
                className="text-[23px] ml-[158px] lg:ml-[430px] cursor-pointer hover:text-red-500"
                onClick={close}
              >
                <AiFillCloseCircle />
              </h1>
              <label
                htmlFor="poto"
                className="text-center -ml-[62px] lg:ml-[70px]  mt-2 capitalize font-serif font-bold text-[20px] "
              >
                Masukkan Photomu
              </label>
              <input
                id="poto"
                type="file"
                onChange={changeHandler}
                className=" mt-5 lg:ml-[143px] text-transparent "
              ></input>
              <button
                type="button"
                className="mt-6 bg-black rounded-xl lg:ml-[140px] hover:animate-bounce text-yellow-400 w-[80px] "
                onClick={addProfil}
              >
                unggah
              </button>
              <p className="h-3  "></p>
            </div>
          )}
          {/* Tambahkan type="button" untuk mencegah default 'submit' form */}
        </>
      )}

      {/* ini baris konfirmasi  */}
      {notif && (
        <div
          style={{
            boxShadow: "0 0 10px white",
            background:
              "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
          }}
          className="fixed top-[300px] w-[80%] inline-block justify-center  items-center left-[35px] rounded-xl pl-[118px] pt-2 lg:w-[50%] lg:ml-[215px] lg:mt-[-70px] "
        >
          <p className="capitalize font-serif text-[25px]  -ml-[130px] text-center  ">
            {notifMessage}
          </p>
          <button
            type="button"
            className="mt-6 bg-black  lg:ml-[130px] rounded-xl hover:animate-bounce text-yellow-400 w-[80px] "
            onClick={notifConfirmUnggah}
          >
            Ok
          </button>
          <p className="h-3  "></p>
        </div>
      )}

      {/*  */}
      {/* ini bagian hapus photo */}
      {listProfil.potoProfil &&
        Object.keys(listProfil.potoProfil).length > 0 && (
          <button
            type="submit"
            onClick={tampilConfirmHapus}
            className={`mt-[40px] ml-3  hover:text-red-600 hover:animate-bounce text-yellow-400 rounded-xl text-[20px] `}
          >
            <BsFillTrashFill />
          </button>
        )}
      {/* ini confirm hapus */}
      {confirmHapus && (
        <div
          style={{
            boxShadow: "0 0 10px white",
            background:
              "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
          }}
          className="fixed top-[300px] lg:mt-[-80px]  w-[80%] inline-block justify-center h-auto items-center left-[35px] rounded-xl pl-[62px] pt-2 lg:w-[50%] lg:ml-[240px]  "
        >
          <p className="capitalize font-serif text-[20px]  -ml-[60px] text-center whitespace-pre-wrap ">
            anda yakin ingin menghapus <br></br> photo profile
          </p>
          <button
            className="mt-6 bg-black rounded-xl lg:ml-[137px] hover:animate-bounce font-semibold text-yellow-400 w-[80px] "
            type="button"
            onClick={HandlerDeleteProfil}
          >
            Ok
          </button>
          <button
            className="mt-6 bg-black rounded-xl hover:animate-bounce font-semibold text-yellow-400 w-[80px] ml-[29px] "
            type="button"
            onClick={hilangConfirmHapus}
          >
            Cancel
          </button>
          <p className="h-3"></p>
        </div>
      )}
      {/*  */}

      {/* baris content tampil data user */}
      {Object.keys(listMahasiswa).length > 0 && (
        <ul
          className={`text-[20px] ml-5 text-yellow-400 capitalize space-y-3 font-serif  ${
            listProfil.potoProfil &&
            Object.keys(listProfil.potoProfil).length > 0
              ? "mt-[60px]"
              : "mt-[100px] "
          } `}
        >
          <li>
            kehadiran:
            <span className="font-bold "> {listMahasiswa.kehadiran} </span>{" "}
            point
          </li>
          <li>
            tugas:<span className="font-bold "> {listMahasiswa.tugas} </span>{" "}
            point
          </li>
          <li>
            partisipasi:
            <span className="font-bold ">
              {" "}
              {listMahasiswa.partisipasi}{" "}
            </span>{" "}
            point
          </li>
          <li>
            tugas online:
            <span className="font-bold ">
              {" "}
              {listMahasiswa.penugasan_online}{" "}
            </span>{" "}
            point
          </li>
          <li>
            quiz:<span className="font-bold "> {listMahasiswa.quiz} </span>{" "}
            point
          </li>
        </ul>
      )}
    </div>
  );
}

export default Profil;
