import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import axios from "axios";
// import Typewriter from "typewriter-effect";
import { FaTrash } from "react-icons/fa";
import { IoMdNavigate } from "react-icons/io";

function Comments() {
  const [story, setStory] = useState("");
  const [comments, setComments] = useState([]);
  const [notifSuccess, setNotifSuccess] = useState(false);
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);
  const [storyIdToDelete, setStoryIdToDelete] = useState(null);
  const [newComment, setNewComment] = useState("");
  const { storyId } = useParams();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    // ini untuk menampilkan story sesuai dengan cerita yang dipilih
    axios
      .get(`http://localhost:3001/story/${storyId}`)
      .then((response) => {
        setStory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // menmapilkan commennt
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/comments/${storyId}`
        );
        const dataComment = response.data;
        const sortedList = dataComment.sort((a, b) => {
          const timestapA = new Date(a.createdAt).getTime();
          const timestapB = new Date(b.createdAt).getTime();
          return timestapB - timestapA;
        });
        setComments(sortedList);
      } catch (error) {
        console.log(error);
      }
    };
    const interval = setInterval(fetchData, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [storyId]);

  // mengirrim comment ke database
  const addComment = async (e) => {
    e.preventDefault();
    if (!newComment) {
      alert("Berikan komen anda terlebih dahulu");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/comments",
        {
          Comment: newComment,
          storyId: storyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ganti token dengan token yang valid
          },
        }
      );

      const data = await response.json;
      console.log(data);
      // const commentToAdd = { Comments: newComment };
      // setComments([...comments, commentToAdd]);
      setNotifSuccess(true);
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };
  // notif saat data berhasil  dikiirim
  function hilangNotifSuccess() {
    setNotifSuccess(false);
  }

  // konfirmasi hapus
  function confirmHapus(commentId) {
    setKonfirmasiHapus(true);
    setStoryIdToDelete(commentId);
  }
  function cancelHapus() {
    setKonfirmasiHapus(false);
    setStoryIdToDelete(null);
  }
  // menghapus komment yang sesuai dengan user dengan comment user yang sedang login
  const deleteComment = async (commentId) => {
    try {
      if (konfirmasiHapus && storyIdToDelete === commentId) {
        await axios.delete(`http://localhost:3001/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      }
      setKonfirmasiHapus(false);
      setStoryIdToDelete(null);
    } catch (error) {
      console.log("Terjadi kesalahan saat menghapus komentar ", error);
    }
  };

  // fungsi agar kembali ke halaman paling atas dari layar
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-transparent w-full ">
      <nav
        style={{
          boxShadow: "0 0 10px white",
          background:
            "linear-gradient(90deg, rgba(77,70,0,1) 0%, rgba(255,192,0,1) 100%)",
        }}
        className="z-40 w-full h-[65px] fixed bg-transparent"
      >
        <h1 className="text-[35px] ml-3 mt-4 w-8 hover:text-black text-white">
          <Link to="/home/talk">
            <MdOutlineKeyboardBackspace />
          </Link>
        </h1>
        {/*  */}
        {/* kembali ke paling atas halaman */}
        <div
          className="hover:bg-yellow-400 bg-black text-yellow-500 hover:text-black cursor-pointer flex justify-center items-center  text-[30px] w-[45px] h-[45px] rounded-xl fixed z-50 mt-[-40px] right-4 border-[2px]  border-opacity-50 border-black  "
          onClick={handleScrollToTop}
        >
          <IoMdNavigate />
        </div>
      </nav>

      <div className="text-[30px] text-black w-full h-auto relative top-[100px]">
        {story && (
          <div
            style={{
              boxShadow: "0 0 10px white",
              background: "rgb(203, 160, 20)",
              border: "solid 2px gold",
            }}
            className="rounded h-auto w-[90%] overflow-ellipsis ml-[19px] lg:ml-[290px] lg:w-[50%] relative text-black text-[20px]"
          >
            <ul className="h-auto w-[87%] items-center overflow-ellipsis ml-[23px] relative text-black text-[20px]">
              <li className="mb-3 pt-3 font-bold text-[20px] capitalize">
                {story.nama}
              </li>
              <li className="break-words leading-5">{story.story}</li>
              <br />
              <br />
              <ul className="flex space-x-3 text-[16px] ml-[240px]">
                <li className="whitespace-nowrap leading-5 text-[15px] relative -left-[243px]">
                  #{story.tagar}
                </li>
              </ul>
            </ul>
            <p className="w-full h-[10px] bg-transparent text-transparent"></p>
          </div>
        )}
      </div>

      {/* ini baris menambahka comment */}
      <div className="font-serif max-w-full text-[17px] text-white w-full h-auto mt-36 inline-block text-center justify-center items-center ">
        <textarea
          value={newComment}
          autoComplete="off"
          onChange={(event) => setNewComment(event.target.value)}
          placeholder="Masukkan Komentar"
          style={{
            background:
              "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
            border: "2px solid goldenrod",
            textShadow: "0 0 10px white",
          }}
          className="text-black font-extralight -mt-4 lg:text-center lg:pt-2 lg:w-[50%] placeholder:text-center placeholder:pt-6 lg:rounded-2xl placeholder:text-black placeholder:opacity-70 bg-sky-500 pl-1 h-[75px] rounded resize-none w-[70%] "
        ></textarea>
        <button
          style={{
            textShadow: "0 0 10px black",
          }}
          className="mt-6 text-[17px] mb-[80px] hover:text-white lg:absolute lg:mt-[90px] lg:ml-[-365px] text-yellow-500 bg-black hover:bg-yellow-500  capitalize font-light w-[150px] rounded-[7px]"
          id="button-comment"
          type="submit"
          onClick={addComment}
        >
          Kirim
        </button>
      </div>

      {/* notif saat berhasil menambahkan cerita  */}
      {notifSuccess && (
        <div
          style={{
            boxShadow: "0 0 30px white",
            border: "1px solid black",
            background:
              "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
          }}
          className="fixed top-[300px]  w-[80%] lg:w-[50%] lg:left-[290px] lg:top-[320px] inline-block z-50 justify-center h-auto items-center left-[35px] rounded-xl pl-[62px] pt-2  "
        >
          <p className="capitalize font-serif text-[20px]  -ml-[60px] text-center whitespace-pre-wrap ">
            komen berhasil ditambahkan
          </p>
          <button
            className="mt-6 bg-black rounded-xl lg:ml-[185px] hover:animate-bounce font-semibold ml-[50px] text-yellow-400 w-[80px] "
            type="button"
            onClick={hilangNotifSuccess}
          >
            Ya
          </button>
          <p className="h-3"></p>
        </div>
      )}

      <br></br>
      {comments.map((value, key) => (
        <div
          style={{
            boxShadow: "0 0 10px white",
            background: "rgb(203, 160, 20)",
            border: "solid 2px gold",
          }}
          key={key}
          className="rounded h-auto w-[90%] overflow-ellipsis ml-[19px] mb-4 lg:mb-[-133px] lg:mt-[150px] lg:ml-[290px] lg:w-[50%] relative text-black text-[20px]"
        >
          <ul className="h-auto  w-[87%] items-center overflow-ellipsis ml-[23px] relative text-black text-[20px]">
            <li className="mb-3 pt-3 font-bold text-[20px] capitalize">
              {value.Nama}
            </li>
            <li>{value.Comments}</li>
          </ul>
          {localStorage.getItem("accessToken") &&
            value.MahasiswaId.toString() === localStorage.getItem("userId") && (
              <button
                className="text-[20px] relative left-[320px] lg:left-[530px] top-3 hover:text-white"
                onClick={() => confirmHapus(value.id)}
              >
                <FaTrash />
              </button>
            )}
          {/* // baris confirm hapus */}
          {konfirmasiHapus && storyIdToDelete === value.id && (
            <div
              style={{
                boxShadow: "0 0 10px white",
                background:
                  "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
              }}
              className="fixed top-[300px] lg:top-[280px] w-[80%] lg:w-[50%] lg:left-[278px] inline-block justify-center h-auto items-center z-50 left-[35px] rounded-xl pl-[62px] pt-2  "
            >
              <p className="capitalize font-serif text-[20px]  -ml-[60px] text-center whitespace-pre-wrap ">
                anda yakin ingin menghapus <br></br> komentar
              </p>
              <button
                className="mt-6 bg-black rounded-xl lg:ml-[135px] hover:animate-bounce font-semibold text-yellow-400 w-[80px] "
                type="button"
                onClick={() => deleteComment(storyIdToDelete)}
              >
                Ya
              </button>
              <button
                className="mt-6 bg-black rounded-xl hover:animate-bounce font-semibold text-yellow-400 w-[80px] ml-[29px] "
                type="button"
                onClick={cancelHapus}
              >
                Tidak
              </button>
              <p className="h-3"></p>
            </div>
          )}
          <p className="w-full h-[10px] bg-transparent text-transparent"></p>
        </div>
      ))}
      <p className="w-full h-[80px] lg:h-[200px] bg-transparent text-transparent"></p>
    </div>
  );
}

export default Comments;
