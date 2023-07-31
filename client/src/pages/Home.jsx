import React from "react";
import axios from "axios";
import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu, GiBookmarklet } from "react-icons/gi";
import { RxDot } from "react-icons/rx";
import { CgLogOut } from "react-icons/cg";
import { BsCalendarCheckFill, BsCircleHalf } from "react-icons/bs";
import { FaHandHoldingHeart } from "react-icons/fa";
import { IoChatbubblesSharp } from "react-icons/io5";
import {
  MdLeaderboard,
  MdLocalActivity,
  MdOutlineLocalActivity,
  MdBookOnline,
  MdQuiz,
} from "react-icons/md";
import { IoIosPeople, IoIosAlbums, IoIosPaper } from "react-icons/io";
import { AiOutlineClose /* AiFillHome, AiFillSetting */ } from "react-icons/ai";
import {
  TbRosetteNumber1,
  TbRosetteNumber2,
  TbRosetteNumber3,
  TbRosetteNumber4,
  TbRosetteNumber5,
  TbRosetteNumber6,
  TbRosetteNumber7,
} from "react-icons/tb";
import {
  // BsFillPersonLinesFill,
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import education from "../assets/education.jpg";
import code from "../assets/code.jpg";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import News from "../components/News";
import jam from "../assets/jam.jpg";
import { Link } from "react-router-dom";
import bgUser from "../assets/bgUserGold.png";
// import MahasiswaComponent from "../components/Nilai";

function Home() {
  const [nameOfMahasiswa, setNameOfMahasiswa] = useState([]);
  const [navbarIcon, setNavbarIcon] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  const [changeColor, setChangeColor] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [listProfil, setListProfil] = useState({});
  const [listMahasiswaNama, setListMahasiswaNama] = useState({});
  const navigate = useNavigate();
  // let navigate = useNavigate();

  // ini baris untuk menangkahp data profil
  const profilData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:3001/profil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setListProfil(response.data);
    } catch (err) {
      console.log("tidak ada data yang diterima");
    }
  };
  // ini tampil berdasarkan user yagn login
  const mahasiswaData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:3001/mahasiswa/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setListMahasiswaNama(response.data.isi);
      console.log(response.data.isi);
    } catch (err) {
      console.log("tidak ada data yang diterima");
    }
  };

  useEffect(() => {
    profilData();
    mahasiswaData();
  }, []);

  // untuk menangkkaop semua database yang sudah di tangkap di folder server pada express
  useEffect(() => {
    axios.get("http://localhost:3001/mahasiswa").then((response) => {
      setNameOfMahasiswa(response.data);
    });
  }, []);

  const numberRank = [
    <TbRosetteNumber1 />,
    <TbRosetteNumber2 />,
    <TbRosetteNumber3 />,
    <TbRosetteNumber4 />,
    <TbRosetteNumber5 />,
    <TbRosetteNumber6 />,
    <TbRosetteNumber7 />,
  ];

  /*ini adalah code untuk membuat perbandingan*/
  let valueMahasiswa = nameOfMahasiswa.sort((a, b) => {
    const totalPointA =
      a.kehadiran + a.tugas + a.partisipasi + a.penugasan_online + a.quiz;
    const totalPointB =
      b.kehadiran + b.tugas + b.partisipasi + b.penugasan_online + b.quiz;

    return totalPointB - totalPointA;
  });

  let topMahasiswa = valueMahasiswa.slice(0, 7);

  let rankMahasiswa = topMahasiswa.map((listMahasiswa, indexMahasiswa) => {
    let rankIcon = numberRank[indexMahasiswa];
    let totalPoint =
      listMahasiswa.kehadiran +
      listMahasiswa.tugas +
      listMahasiswa.partisipasi +
      listMahasiswa.penugasan_online +
      listMahasiswa.quiz;
    return { ...listMahasiswa, rankIcon, totalPoint };
  });

  const image = [
    {
      URL: code,
    },
    {
      URL: education,
    },
    {
      URL: p2,
    },
    {
      URL: p1,
    },
  ];

  const icons1 = [
    <Link to="/home/catatan">
      <GiBookmarklet className="hover:animate-bounce" />
    </Link>,
    <Link to="/home/daftarsiswa">
      <IoIosPeople className="hover:animate-bounce" />
    </Link>,
    <Link to="/home/diagramnilai">
      <MdLeaderboard className="hover:animate-bounce" />
    </Link>,
    <Link to="/home/talk">
      <IoChatbubblesSharp className="hover:animate-bounce" />
    </Link>,
  ];
  const icons2 = [
    <MdOutlineLocalActivity className="hover:animate-bounce" />,
    <IoIosAlbums className="hover:animate-bounce" />,
    <FaHandHoldingHeart className="hover:animate-bounce" />,
  ];

  //
  // validasi logout
  const confirmLogoutClickOn = () => {
    setConfirmLogout(!confirmLogout);
    setNavbarIcon();
  };
  const confirmLogoutClickOff = () => {
    setConfirmLogout();
  };
  const handleLogout = () => {
    // Hapus cookie isLoggedIn
    Cookies.remove("isLoggedIn");

    // Hapus data sesi (misalnya, accessToken)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");

    // Alihkan pengguna ke halaman Login
    navigate("/");
  };
  const navbarNavTop = [
    {
      url: "Kehadiran",
      ikon: <BsCalendarCheckFill />,
      link: "kehadiran",
    },
    {
      url: "Tugas",
      ikon: <IoIosPaper />,
      link: "tugas",
    },
    {
      url: "Partisipasi",
      ikon: <MdLocalActivity />,
      link: "partisipasi",
    },
    {
      url: "Tugas_online",
      ikon: <MdBookOnline />,
      link: "tugasOnline",
    },
    {
      url: "Quiz",
      ikon: <MdQuiz />,
      link: "quiz",
    },
    {
      url: <button className="text-[16px] font-serif">logout</button>,
      ikon: <CgLogOut onClick={confirmLogoutClickOn} />,
      link: "",
    },
  ];

  const hamburgerClick = () => {
    setNavbarIcon(!navbarIcon);
  };

  // tombol slide image
  function prevSlide() {
    const isFristSlide = currentIndex === 0;
    const newIndex = isFristSlide ? image.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  function nextSlide() {
    const isLastSlide = currentIndex === image.length - 1;
    const newIndex2 = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex2);
  }

  function goToSlide(imageSlide) {
    setCurrentIndex(imageSlide);
  }

  // set time
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const currentTime = time.toLocaleTimeString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
  });

  function changeColorClick() {
    setChangeColor(!changeColor);
  }

  return (
    <>
      {/* ini baris konfirmasi logut start  */}
      {confirmLogout && (
        <div
          style={{
            opacity: "0.9",
            boxShadow: "0 0 10px black",
            background:
              "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
          }}
          className=" inline-block justify-center items-center pt-[40px] font-serif text-center bg-yellow-700 w-[70%] h-[150px] fixed ml-[60px] rounded-xl z-40 top-[270px] lg:w-[50%] lg:ml-[285px] lg:mt-[-100px]  "
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
      {/* ini baris konfirmasi logut end */}
      {/*  */}
      {/*  */}
      <div className=" w-full h-[300vh] lg:w-[50%] lg:ml-[275px] ">
        {/* navigation start  */}
        <nav
          style={{
            boxShadow: "0 0 10px white",
            background:
              "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
          }}
          className=" z-40 w-full h-[65px] fixed lg:hidden  bg-transparent lg:ml-[-275px] "
        >
          {navbarIcon ? (
            <AiOutlineClose
              onClick={hamburgerClick}
              className="text-black text-[70px] pt-4 pb-4 ml-[310px] lg:hidden hover:text-white"
            />
          ) : (
            <GiHamburgerMenu
              onClick={hamburgerClick}
              className="text-black text-[70px] ml-[310px] pt-4 pb-4 lg:hidden hover:text-white"
            />
          )}
          {/* navbar top */}
          {navbarIcon ? (
            <div className=" w-[50%] -mt-[5px] h-[600px] duration-500 ml-[214px]   ">
              <ul
                style={{
                  opacity: "0.9",
                  boxShadow: "0 0 10px white",
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                  background:
                    "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
                }}
                className=" rounded-2xl w-full mt-1 -ml-5 h-[116%] pt-10 pl-6  duration-500    "
              >
                {/* ini bagian profil */}
                {listProfil && Object.keys(listProfil).length > 0 ? (
                  <Link to="/home/profil">
                    <li
                      style={{ border: "1px solid black" }}
                      // id="profil-at-home"
                      className="bg-black w-[47%]  ml-10 hover:animate-bounce rounded-[40px] h-[70px] flex justify-center items-center "
                    >
                      <img
                        className="object-cover w-[145px]  h-[80px] rounded-full"
                        src={`http://localhost:3001/uploads/${listProfil.potoProfil}`}
                        alt="Profil"
                      />
                    </li>
                  </Link>
                ) : (
                  <Link to="/home/profil">
                    <li
                      id="profil-at-home"
                      className="bg-black w-[50%] ml-9  hover:animate-bounce rounded-[40px] h-[80px] flex justify-center items-center "
                    >
                      <img
                        className="object-cover w-[145px] h-[86px] rounded-full"
                        src={bgUser}
                        alt="noneProfil"
                      />
                    </li>
                  </Link>
                )}
                {/* nama mahasiswa  */}
                {Object.keys(listMahasiswaNama).length > 0 && (
                  <li
                    id="single-word"
                    className="text-black sing font-serif font-bold text-[24px] capitalize mb-[-15px] mt-3 text-center -ml-3 "
                  >
                    {listMahasiswaNama.nama}
                  </li>
                )}
                {/*  */}
                {navbarNavTop.map((list, key) => (
                  <li
                    key={key}
                    className="flex hover:bg-black hover:text-[#f4b900]  font-bold h-[43px] w-[160px] rounded-xl text-black mt-10 space-x-2 "
                  >
                    <Link to={list.link}>
                      <p className="text-[30px] w-10 pl-1 pt-2 ">{list.ikon}</p>
                      <p className="mb-6 pt-2">{list.url}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
        </nav>

        <div
          id="home"
          style={{
            backgroundImage: `url(${image[currentIndex].URL})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            borderTopRightRadius: "0px",
            borderBottomLeftRadius: "0px",
          }}
          className="bg-black relative lg:border-2 lg:border-yellow-400 top-16 w-full lg:-mt-[73px] h-[260px] duration-500 group lg:w-[105%] lg:top-[73px] lg:rounded-2xl lg:ml-[-5px] "
        >
          {/* ikons arrow */}
          <ul className="text-white h-1 text-[30px] space-x-[300px] lg:space-x-[450px] cursor-pointer  flex justify-center items-center pt-[110px] ">
            <li
              onClick={prevSlide}
              className="opacity-60 -translate-x-0 hover:text-yellow-400 translate-y-[50%] hover:opacity-100 hidden group-hover:block  "
            >
              <BsFillArrowLeftCircleFill />
            </li>
            <li
              onClick={nextSlide}
              className="opacity-60  hover:opacity-100 -translate-x-0 translate-y-[50%] hover:text-yellow-400 hidden group-hover:block"
            >
              <BsFillArrowRightCircleFill />
            </li>
          </ul>
          {/* ikons dot */}

          <ul
            style={{ textShadow: "0 0 15px white" }}
            className="text-[30px] lg:space-x-4 cursor-pointer  text-white flex justify-center items-center mt-28"
          >
            {image.map((Images, imageIndex) => (
              <li key={imageIndex} className="hover:text-yellow-400">
                <RxDot onClick={() => goToSlide(imageIndex)} />
              </li>
            ))}
          </ul>
        </div>

        {/* icons navigasi */}
        <div className=" w-full h-[300px] mt-[60px] pt-5 text-gray-300 text-4xl ">
          <ul className="flex justify-center items-center space-x-14 mt-7 ">
            {icons1.map((icon1, key) => (
              <li
                key={key}
                style={{
                  boxShadow: "0 0 10px black",
                  background:
                    "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
                }}
                className="text-center hover:bg-black text-black rounded-xl w-9 hover:text-white  "
              >
                {icon1}
              </li>
            ))}
          </ul>
          <ul className="mt-10 flex justify-center items-center space-x-14 ">
            {icons2.map((icon2, key) => (
              <li
                key={key}
                style={{
                  boxShadow: "0 0 10px black",
                  background:
                    "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
                }}
                className=" text-center cursor-no-drop  hover:bg-white rounded-xl w-9 hover:text-white text-black  "
              >
                {icon2}
              </li>
            ))}
          </ul>
        </div>
        <br></br>

        {/*  */}
        {/*  */}
        <h1 className="-mt-[115px] text-white ml-3 text-[25px] font-serif font-bold lg:mt-[-540px] lg:border-b-2 lg:border-yellow-300 lg:text-[20px] lg:ml-[615px] lg:absolute ">
          <Typewriter
            options={{
              strings: ["Rank teratas hari ini"],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <br></br>
        <br></br>
        <div className=" flex  items-center space-x-5 w-full relative h-[220px] -mt-20  overflow-x-scroll  lg:mb-[-2000px] lg:space-y-4 lg:h-[100%] lg:inline-block lg:top-[-780px] lg:overflow-y-visible lg:left-[580px] lg:w-[50%] lg:overflow-hidden ">
          {rankMahasiswa.map((Mahasiswa, key) => (
            <ul
              style={{
                boxShadow: "0 0 10px black",
                background:
                  "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
              }}
              key={key}
              className="text-center bg-yellow-700 w-[60%] ml-2 lg:ml-5 h-[150px] rounded-2xl text-black font-serif flex-shrink-0 lg:w-[90%] "
            >
              <li className="text-[35px] text-black ">{Mahasiswa.rankIcon}</li>
              <li className="text-[19px] capitalize">{Mahasiswa.nama}</li>
              <li>{Mahasiswa.totalPoint} Point</li>
              <Link to="/home/daftarsiswa">
                <button
                  type="submit"
                  style={{ boxShadow: "0 0 10px black" }}
                  className="bg-black mt-6 rounded-xl w-16 text-[#f4b900] hover:text-white hover:bg-black "
                >
                  Detail
                </button>
              </Link>
            </ul>
          ))}

          <p className="text-transparent">1</p>
          {/* <div className="bg-black w-[40%] h-[150px] rounded-2xl "></div> */}
        </div>

        {/* content end */}

        <p
          style={
            changeColor
              ? { textShadow: "0 0 10px black" }
              : { textShadow: "0 0 10px white" }
          }
          className={`absolute ml-[165px] mt-[54px] lg:mt-[-90px] lg:ml-[255px] font-serif font-extralight text-[25px] ${
            changeColor ? "text-yellow-500" : "text-white"
          } `}
        >
          <p className="-ml-[0.1px]">{currentTime}</p>
          <button
            className={`mt-[13px lg:mt-[22px] lg:-ml-[19px]  lg:text-[24px] -ml-1 text-[15px] rounded-2xl ${
              changeColor ? "bg-white" : "bg-yellow-500"
            } `}
            onClick={changeColorClick}
          >
            <BsCircleHalf />
          </button>
        </p>
        <img
          src={jam}
          alt=""
          className="  w-[43%] h-[150px] lg:h-[200px] lg:-mt-[170px] ml-[28%] "
        />
        {/* <MahasiswaComponent /> */}
        <News />
        {/* penutup */}
      </div>

      {/*  */}
      {/*  */}
      {/*  */}
      {/* ini baris navbar top untuk desain dekstop */}
      {/* ini baris navbar top untuk desain dekstop */}
      {/* ini baris navbar top untuk desain dekstop */}
      <div className=" w-[23%]  -mt-[530px] h-[510px] duration-500 -ml-[500px] lg:ml-[25px] lg:mt-[-1700px]   ">
        <ul
          style={{
            opacity: "0.9",
            boxShadow: "0 0 10px black",
            borderTop: "0px",
            background:
              "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
          }}
          className=" rounded-2xl w-full mt-1 -ml-5 h-[116%] pt-10 pl-6  duration-500    "
        >
          {/* ini bagian profil */}
          {listProfil && Object.keys(listProfil).length > 0 ? (
            <Link to="/home/profil">
              <li
                // style={{ border: "1px solid black" }}
                // id="profil-at-home"
                className="bg-black w-[40%] hover:animate-bounce ml-[53px]  mt-5 rounded-[40px] h-[70px] flex justify-center items-center "
              >
                <img
                  className="object-cover w-[145px] h-[96px] rounded-full"
                  src={`http://localhost:3001/uploads/${listProfil.potoProfil}`}
                  alt="Profil"
                />
              </li>
            </Link>
          ) : (
            <Link to="/home/profil">
              <li
                id="profil-at-home"
                className="bg-none w-[40%] hover:animate-bounce ml-[53px] mt-5  rounded-[40px] h-[70px] flex justify-center items-center "
              >
                <img
                  className="object-cover w-[145%]   h-[96px] rounded-full"
                  src={bgUser}
                  alt="noneProfil"
                />
              </li>
            </Link>
          )}
          {/* nama mahasiswa  */}
          {Object.keys(listMahasiswaNama).length > 0 && (
            <li
              id="single-word"
              className="text-black sing font-serif font-bold text-[24px] capitalize mb-5 mt-7 text-center -ml-10 "
            >
              {listMahasiswaNama.nama}
            </li>
          )}
          {/*  */}
          {navbarNavTop.map((list, key) => (
            <li
              key={key}
              className="inline  hover:text-white  font-bold h-[43px] w-[160px] rounded-xl text-black mt-10 space-x-2 "
            >
              <Link to={list.link}>
                <p className="text-[30px] w-10 pl-1 pt-2 ">{list.ikon}</p>
                <p className="mb-6 -mt-[25px] ml-[50px] ">{list.url}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
