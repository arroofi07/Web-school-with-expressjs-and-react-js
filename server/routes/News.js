const express = require("express");
const router = express.Router();
// const News = require("../models");
const mysql = require("mysql");
const axios = require("axios");



// teknologi news
router.get("/teknologi", async (req, res) => {
  try {
    const apiUrl = "https://berita-indo-api.vercel.app/v1/cnn-news/teknologi";
    const response = await axios.get(apiUrl);

    const newsData = response.data.data;

    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Dynamite07",
      database: "community",
    });

    connection.connect();

    newsData.forEach((news) => {
      const { title, contentSnippet, isoDate, link } = news;
      // Ubah format tanggal menjadi format yang dapat diterima oleh MySQL
      const tanggal = new Date(isoDate)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const query = `INSERT INTO beritaterkinis (judul, konten, tanggal, sumber) VALUES (?, ?, ?, ?)`;
      connection.query(
        query,
        [title, contentSnippet, tanggal, link],
        (error, results) => {
          if (error) throw error;
        }
      );
    });

    connection.end();

    res.json(newsData);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;
