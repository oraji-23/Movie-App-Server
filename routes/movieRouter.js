const express = require("express");

const methodNotAllowed = require("../utils/methodNotAllowed");
const {
  allMovies,
  allData,
  allSeries,
} = require("../controllers/movieController");

const router = express.Router();

router.route("/").get(allData).all(methodNotAllowed);
router.route("/movies").get(allMovies).all(methodNotAllowed);
router.route("/series").get(allSeries).all(methodNotAllowed);

module.exports = router;
