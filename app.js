// requires dotenv package and configures it immediately
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//spins up a new express application
const app = express();

// uses port from the env file or defaults to 3000
const port = process.env.PORT || 3000;

const authRouter = require("./routes/authRouter");
const movieRouter = require("./routes/movieRouter");
const bookmarkRouter = require("./routes/bookmarkRouter");
const error = require("./middlewares/error");

app.use(cors());

// ALLOWS ACCESS TO THE REQ.BODY ON ALL REQUEST (REQ.BODY WOULD BE UNDEFINED WITHOUT THIS )
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/movie", movieRouter);
app.use("/api/bookmark", bookmarkRouter);
app.use(error);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Coonected");
    app.listen(port, () => {
      console.log(`Server is listening on port:${port}`);
    });
  } catch (err) {
    // console.log(err);
    console.log("Unable to connect");
  }
};

start();

// starts listening on a given port and runs the callback function when it does
