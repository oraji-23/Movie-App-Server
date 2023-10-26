const Movie = require("../models/movie");

const allData = async (req, res) => {
  const allData = await Movie.find({});
  res.status(200).json({
    data: allData,
  });
};

const allSeries = async (req, res) => {
  const series = await Movie.find({ type: "series" });
  res.status(200).json({
    data: series,
  });
};

const allMovies = async (req, res) => {
  const allMovies = await Movie.find({ type: "movie" });
  res.status(200).json({
    data: allMovies,
  });
};

module.exports = { allData, allMovies, allSeries };
