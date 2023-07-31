import axios from "axios";
import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

function News() {
  const [news, setNews] = useState([]);

  // teknologi news
  useEffect(() => {
    axios.get("http://localhost:3001/news/teknologi").then((response) => {
      setNews(response.data.slice(0, 10));
    });
  }, []);

  return (
    <div className="inline-block justify-center items-center space-y-5 text-center font-serif  text-white w-full h-[59%]  mt-[80px] ">
      <h1 className=" text-white absolute ml-5 lg:ml-[192px] lg:border-b-2 lg:border-yellow-400 -mt-[40px] text-[25px] font-serif font-bold ">
        <Typewriter
          options={{
            strings: ["Berita hari ini"],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
      {news.map((list, key) => (
        <div
          style={{
            boxShadow: "0 0 10px black",
            background:
              "linear-gradient(90deg, rgba(138,106,0,1) 1%, rgba(244,185,0,1) 100%, rgba(230,173,0,1) 100%)",
          }}
          className="text-white -z-30 text-[15px] bg-yellow-700  inline-block justify-center items-center rounded-2xl  w-[97%] h-[260px] lg:h-[250px] pt-5 "
          key={key}
        >
          <ul className="text-black font-extralight text-[15px]  inline-block justify-center items-center rounded-2xl  w-[94%] h-[230px]  ">
            <li>
              <a href={list.link}>{list.title}</a>
            </li>
            <li
              style={{
                backgroundImage: `url(${list.image.large})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "340px",
              }}
              className="w-[93%] ml-[12px] lg:ml-[18px] h-[170px] rounded-xl  bg-black "
            ></li>
          </ul>
        </div>
      ))}
      <p className="bg-transparent w-full h-[14px]"></p>
    </div>
  );
}

export default News;
