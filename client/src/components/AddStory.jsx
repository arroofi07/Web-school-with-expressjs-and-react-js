import React, { useState } from "react";
import Typewriter from "typewriter-effect";

function AddStory() {
  const [story, setStory] = useState("");
  const [tagar, setTagar] = useState("");
  const [notifSuccess, setNotifSuccess] = useState(false);

  // ini submit untuk memasukkan
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!story.trim()) {
      // Menampilkan pesan error jika textarea kosong
      alert("isi cerita terlebih dahulu!");
      return;
    } else if (!tagar.trim()) {
      // Menampilkan pesan error jika tagar kosong
      alert("isi tagar terlebih dahulu!");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      //  lakukan jumlah kata input tagar
      const tagarWords = tagar.trim().split("");
      const wordCount = tagarWords.length;
      const MAX_WORD_COUNT = 16;

      if (wordCount > MAX_WORD_COUNT) {
        alert(`Tagar hanya boleh terdiri dari ${MAX_WORD_COUNT} kata.`);
        return;
      }

      const storyData = { story, tagar };

      const response = await fetch("http://localhost:3001/story/talk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(storyData),
      });

      const data = await response.json();
      console.log(data); // Data mahasiswa yang telah ditambahkan ceritanya
      // Lakukan tindakan setelah cerita berhasil ditambahkan

      // Reset textarea setelah submit berhasil
      setNotifSuccess(true);
      setStory(""); // Mengosongkan nilai textarea
      setTagar("");
    } catch (error) {
      console.log(error);
    }
  };

  // menghilangkann notif yang keluar saat cerita berhasil dikirim
  function hilangNotifSuccess() {
    setNotifSuccess(false);
  }
  // function tampilNotifSuccess() {
  //   setNotifSuccess(true);
  // }

  return (
    <div className="font-serif max-w-full text-[17px] text-white w-full  h-auto mt-20 lg:mt-[120px] inline-block text-center justify-center items-center ">
      <form noValidate method="post" action="" onSubmit={handleSubmit}>
        <label for="text" className="capitalize text-[22px] ">
          <Typewriter
            options={{
              strings: ["Apa ceritamu hari ini"],
              autoStart: true,
              loop: true,
            }}
          />
        </label>
        <br></br>
        <textarea
          id="text"
          type="text"
          placeholder="Masukkan Ceritamu..."
          autoComplete="off"
          value={story}
          style={{
            background:
              "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
            border: "2px solid goldenrod",
            textShadow: "0 0 10px white",
          }}
          className="text-black font-extralight -mt-4 lg:text-center lg:pt-2 lg:w-[50%] placeholder:text-center placeholder:pt-6 lg:rounded-2xl placeholder:text-black placeholder:opacity-70 bg-sky-500 pl-1 h-[75px] rounded resize-none w-[70%] "
          onChange={(e) => setStory(e.target.value)}
        />
        <br></br>
        <textarea
          id="tagar"
          type="text"
          placeholder="Masukkan tagar..."
          autoComplete="off"
          value={tagar}
          onChange={(e) => setTagar(e.target.value)}
          style={{
            background:
              "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
            border: "2px solid goldenrod",
            textShadow: "0 0 10px white",
          }}
          className="text-black pt-2 font-extralight mt-2 lg:w-[50%] lg:text-center placeholder:text-center lg:rounded-2xl lg:ml-[2px] lg:mt-2 placeholder:text-black placeholder:opacity-70 bg-sky-500 pl-1 h-[45px] rounded resize-none w-[70%] "
        />
        <button
          style={{
            textShadow: "0 0 10px black",
          }}
          id="button-cerita"
          type="submit"
          className="mt-6 lg:absolute lg:mt-[80px] lg:left-[495px]  text-[17px] hover:text-white text-yellow-500 bg-black hover:bg-yellow-500  capitalize  font-light w-[150px] rounded-[7px]"
        >
          Tambahkan cerita
        </button>
      </form>

      {notifSuccess && handleSubmit && (
        <div
          style={{
            boxShadow: "0 0 30px white",
            border: "1px solid black",
            background:
              "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
          }}
          className="fixed top-[300px]  w-[80%] lg:w-[50%] lg:left-[290px] lg:top-[320px] inline-block z-50 justify-center h-auto items-center left-[35px] rounded-xl pl-[62px] pt-2  "
        >
          <p className="capitalize font-serif text-[20px] text-black  -ml-[60px] text-center whitespace-pre-wrap ">
            Cerita berhasil dikirim
          </p>
          <button
            className="mt-6 bg-black rounded-xl hover:animate-bounce font-semibold -ml-[60px] text-yellow-400 w-[80px] "
            type="button"
            onClick={hilangNotifSuccess}
          >
            Ok
          </button>
          <p className="h-3"></p>
        </div>
      )}
    </div>
  );
}

export default AddStory;
