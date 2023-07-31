import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { FaComment, FaCommentAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import Typewriter from "typewriter-effect";

function ListStory() {
  const [listStory, setListStory] = useState([]);
  const [newNotifLiked, setNewNotifLiked] = useState({});
  const [newNotifComment, serNewNotifComment] = useState({});
  const [likedStatus, setLikedStatus] = useState({});
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);
  const [storyIdToDelete, setStoryIdToDelete] = useState(null);
  const navigate = useNavigate();

  // tangkap data cerita
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/story");
        // urutkan berdasarkan cerita terbaru
        const dataStory = response.data;
        const sortedList = dataStory.sort((a, b) => {
          const timestampA = new Date(a.updatedAt).getTime();
          const timestampB = new Date(b.updatedAt).getTime();
          return timestampB - timestampA;
        });
        setListStory(sortedList);
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(fetchData, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    fetchLikedStatusFromServer();
  }, []);

  // tangkap data like
  const fetchLikedStatusFromServer = async () => {
    try {
      const response = await axios.get("http://localhost:3001/likes", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      const likedStatusData = response.data;
      setLikedStatus(likedStatusData);
    } catch (error) {
      console.error("Failed to fetch liked status:", error);
    }
  };

  const likedStory = (storyId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { StoryId: storyId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        const notif = response.data;

        setLikedStatus((prevState) => ({
          ...prevState,
          [storyId]: notif === "Liked",
        }));
      });
  };

  const confirmHapus = (storyId) => {
    setKonfirmasiHapus(true);
    setStoryIdToDelete(storyId);
  };

  const cancelHapus = () => {
    setKonfirmasiHapus(false);
    setStoryIdToDelete(null);
  };

  const hapusStory = async (storyId) => {
    try {
      if (konfirmasiHapus && storyIdToDelete === storyId) {
        await axios.delete(`http://localhost:3001/story/${storyId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const newListStory = listStory.filter((story) => story.id !== storyId);
        setListStory(newListStory);
      }

      setKonfirmasiHapus(false);
      setStoryIdToDelete(null);
    } catch (error) {
      console.log("error saat menghapus cerita ", error);
    }
  };

  function tampilLike(storyId) {
    setNewNotifLiked((prevState) => ({
      ...prevState,
      [storyId]: true,
    }));
  }

  function hilangLike(storyId) {
    setNewNotifLiked((prevState) => ({
      ...prevState,
      [storyId]: false,
    }));
  }

  function tampilKomen(storyId) {
    serNewNotifComment((prevState) => ({
      ...prevState,
      [storyId]: true,
    }));
  }

  function hilangKomen(storyId) {
    serNewNotifComment((prevState) => ({
      ...prevState,
      [storyId]: false,
    }));
  }

  return (
    <div className="space-y-5 font-serif inline-block justify-center lg:mt-[60px] items-center relative top-[80px] w-full h-auto">
      <h1 className="capitalize text-[22px] items-center text-center text-white">
        <Typewriter
          options={{
            strings: ["Semua Cerita"],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>

      {listStory.map((storys, key) => (
        <div
          style={{
            boxShadow: "0 0 10px white",
            background: "rgb(203, 160, 20)",
            border: "solid 2px gold",
          }}
          className="rounded h-auto w-[90%] overflow-ellipsis ml-[19px] lg:ml-[290px] lg:w-[50%] relative text-black text-[20px]"
          key={key}
        >
          <ul className="h-auto w-[87%] items-center overflow-ellipsis ml-[23px] relative text-black text-[20px]">
            <li className="mb-3 pt-3 font-bold text-[20px] capitalize">
              {storys.nama}
            </li>
            <li>{storys.likes}</li>
            <li className="break-words leading-5">{storys.story}</li>
            <li
              style={{
                boxShadow: "border-box",
                marginRight: "5px",
              }}
              className="break-words inline-block  rounded leading-5 relative top-[30px] left-[250px]  box-border "
            >
              <p
                className={` ${
                  newNotifLiked[storys.id]
                    ? "text-[22px] lg:ml-[200px]  "
                    : "hidden text-[30px] text-black"
                } `}
              >
                <FaCommentAlt />
              </p>
              <p
                className={`${
                  newNotifLiked[storys.id]
                    ? "text-white absolute w-7  top-[-2px] right-[-3px] text-center "
                    : "text-transparent"
                } `}
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                }}
              >
                {storys.Likes.length}
              </p>
            </li>
            <li
              style={{
                boxShadow: "border-box",
                marginRight: "5px",
              }}
              className="break-words inline-block  brounded leading-5  relative top-[30px] left-[275px] box-border "
            >
              <p
                className={` ${
                  newNotifComment[storys.id]
                    ? "text-[22px] lg:ml-[200px] "
                    : "hidden text-[30px] text-black"
                } `}
              >
                <FaCommentAlt />
              </p>
              <p
                className={`${
                  newNotifComment[storys.id]
                    ? "text-white absolute w-7  top-[-2px] -right-[2px] text-center "
                    : "text-transparent"
                } `}
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                }}
              >
                {storys.Comments.length}
              </p>
            </li>
            <br />
            <br />
            <ul className="flex space-x-3 h-auto text-[16px] ml-[245px]">
              {localStorage.getItem("accessToken") &&
                storys.MahasiswaId.toString() ===
                  localStorage.getItem("userId") && (
                  <button
                    onClick={() => confirmHapus(storys.id)}
                    className="text-[20px] relative right-[250px] -mr-[30px]  hover:text-white"
                  >
                    <FaTrash />
                  </button>
                )}
              {konfirmasiHapus && storyIdToDelete === storys.id && (
                <div
                  style={{
                    boxShadow: "0 0 10px white",
                    background:
                      "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
                  }}
                  className="fixed top-[300px] w-[80%] lg:w-[50%] lg:left-[278px] inline-block justify-center h-auto items-center z-50 left-[35px] rounded-xl pl-[62px] pt-2  "
                >
                  <p className="capitalize font-serif text-[20px]  -ml-[60px] text-center whitespace-pre-wrap ">
                    Anda yakin ingin menghapus <br></br> cerita?
                  </p>
                  <button
                    className="mt-6 bg-black rounded-xl lg:ml-[130px] hover:animate-bounce font-semibold text-yellow-400 w-[80px] "
                    type="button"
                    onClick={() => hapusStory(storyIdToDelete)}
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
              <li>
                <p
                  id="like"
                  className={`bg-yellow-400 cursor-pointer   w-[24px] h-[24px] pl-[3px] lg:ml-[200px] active:animate-ping  active:text-[30px] transition duration-1000 pt-[5.5px] rounded-[35px] ${
                    likedStatus[storys.id] ? "text-red-500  " : "text-black "
                  }`}
                  style={{
                    boxShadow: "0 0 7px black",
                    border: "solid 1px black",
                  }}
                  onMouseMove={() => tampilLike(storys.id)}
                  onMouseLeave={() => hilangLike(storys.id)}
                  onClick={() => {
                    likedStory(storys.id);
                  }}
                >
                  <BsHeartFill />
                </p>
              </li>
              <li>
                <p
                  id="comments"
                  className="bg-yellow-400  cursor-pointer w-[24px] h-[24px] pl-[3.5px] pt-1 rounded-[35px]"
                  style={{
                    color: "black",
                    boxShadow: "0 0 7px black",
                    border: "solid 1px black",
                  }}
                  onMouseMove={() => tampilKomen(storys.id)}
                  onMouseLeave={() => hilangKomen(storys.id)}
                  onClick={() => {
                    const storyId = storys.id;
                    navigate(`/home/story/comments/${storyId}`);
                  }}
                >
                  <FaComment />
                </p>
              </li>
            </ul>
          </ul>

          <p className="w-full h-[10px] bg-transparent text-transparent"></p>
        </div>
      ))}
      <p className="w-full h-[10px] bg-transparent text-transparent"></p>
    </div>
  );
}

export default ListStory;
