require("dotenv").config();

const mongoose = require("mongoose");
const Movie = require("./models/movie");
const moviesJson = require("./movies.json");

const start = async () => {
  try {
    //  CONNECTS TO THE DATA BASE

    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
    console.log("Deleting...");
    // DELETES THE PREVIOUS MOVIES IN THE DATA BASE
    await Movie.deleteMany();
    console.log("previous ones deleted");
    console.log("Uploading....");

    await Movie.create(moviesJson);

    console.log("Movie Uploaded Successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
    process.exit(1);
  }
};

start();
