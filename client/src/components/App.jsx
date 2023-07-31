import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Catatan from "../pages/Catatan";
import DaftarSiswa from "../pages/DaftarSiswa";
import DiagramNilai from "../pages/DiagramNilai";
import Talk from "../pages/Talk";
import Comments from "../pages/Comments";
import { IoMdNavigate } from "react-icons/io";
import Kehadiran from "../pages/Kehadiran";
import Tugas from "../pages/Tugas";
import Partisipasi from "../pages/Partisipasi";
import TugasOnline from "../pages/TugasOnline";
import Quiz from "../pages/Quiz";
import Profil from "../pages/Profil";
import Admin from "../pages/Admin";
import LoginAdmin from "../pages/LoginAdmin";
import { BiLogOut } from "react-icons/bi";

function App() {
  // const [cookieValue, setCookieValue] = useState("");
  // const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  


  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn");
    const currentPath = window.location.pathname;
    const userProtectedRoutes = ["/", "/register", "/admin/home"]; // Rute terlindungi untuk user biasa
    const adminProtectedRoutes = [
      "/admin",
      "/home",
      "/admin/home",
      "/register",
    ]; // Rute terlindungi untuk admin

    if (isLoggedIn === "true") {
      // Jika pengguna sudah login
      if (userProtectedRoutes.includes(currentPath)) {
        // Jika pengguna mencoba mengakses rute terlindungi untuk user
        navigate("/home", { replace: true });
      } else if (adminProtectedRoutes.includes(currentPath)) {
        // Jika pengguna mencoba mengakses rute terlindungi untuk admin
        navigate("/admin/home", { replace: true });
      }
    } else if (
      currentPath !== "/" &&
      currentPath !== "/register" &&
      currentPath !== "/admin"
    ) {
      navigate("/", { replace: true });
    } else {
      // Jika pengguna belum login
      if (
        userProtectedRoutes.includes(currentPath) ||
        adminProtectedRoutes.includes(currentPath)
      ) {
        // Jika pengguna mencoba mengakses rute terlindungi untuk user atau admin
        navigate("/", { replace: true });
      }
    }
  }, []);

  // fungsi agar kembali ke halaman paling atas dari layar
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ini baris autentikasi halaman admin
  const isAuthentication = () => {
    const namaSecretKey =
      "utawl,454.244,421,3233445,5678,7844534432423423492348.454,34243";
    const secretKey = localStorage.getItem("secretKey");

    return secretKey === namaSecretKey;
  };

  // fungsi logout
  const handleLogout = () => {
    // Hapus cookie isLoggedIn
    Cookies.remove("isLoggedIn");

    // Hapus data sesi (misalnya, accessToken)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");

    // Alihkan pengguna ke halaman Login
    navigate("/admin");
  };

  return (
    <>
      {/* ini tombol navigasi halaman home */}

      <Routes>
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        {/*  */}

        {isAuthentication() ? (
          <Route path="/admin/home" element={<Admin />} />
        ) : (
          <Route
            path="/admin/home"
            element={
              <div>
                <div
                  id="navigasiHome"
                  className="bg-yellow-400 z-50 cursor-pointer lg:ml-5 hover:text-yellow-500 hover:bg-black flex justify-center items-center relative left-[11px]  text-[30px] w-[45px] h-[45px] mt-[15px] rounded-xl    right-4 border-[2px] border-opacity-50 border-yellow-400  "
                  onClick={handleLogout}
                >
                  <BiLogOut />
                </div>
                <h1 className="text-[50px] text-white capitalize ">
                  Terdapat potensi keamanan terdeteksi LogOut sekarang!!
                </h1>
              </div>
            }
          />
        )}

        <Route
          path="/home"
          element={
            <>
              <div
                id="navigasiHome"
                className="bg-black flex justify-center items-center  text-[30px] w-[45px] h-[45px] rounded-xl fixed z-30 mt-[690px] hover:bg-yellow-500 hover:text-black lg:mt-[600px] lg:fixed text-yellow-500 cursor-pointer right-4 border-[2px] border-opacity-50 border-yellow-400  "
                onClick={handleScrollToTop}
              >
                <IoMdNavigate />
              </div>
              <Home />
            </>
          }
        />
        <Route path="/home/catatan" element={<Catatan />} />
        <Route path="/home/daftarsiswa" element={<DaftarSiswa />} />
        <Route path="/home/diagramnilai" element={<DiagramNilai />} />
        <Route path="/home/talk" element={<Talk />} />
        <Route path="/home/story/comments/:storyId" element={<Comments />} />
        <Route path="/home/profil" element={<Profil />} />
        <Route path="/home/kehadiran" element={<Kehadiran />} />
        <Route path="/home/tugas" element={<Tugas />} />
        <Route path="/home/partisipasi" element={<Partisipasi />} />
        <Route path="/home/tugasOnline" element={<TugasOnline />} />
        <Route path="/home/quiz" element={<Quiz />} />
        {/* <Route path="/byId/:id" element={<Detail />} /> */}
      </Routes>
    </>
  );
}

export default App;
