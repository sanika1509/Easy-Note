const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const authenticate = require("./middlewares/auth");
const noteRouter = require("./routes/noteRoute");
const userRouter = require("./routes/userRoute");

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // Change to your frontend URL
    credentials: true, // Allows cookies to be sent/received
  })
);

app.use(express.json());

app.use(cookieParser());
app.use("/notes", authenticate, noteRouter);
app.use("/user", userRouter);

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected succesfully");

    app.listen(process.env.PORT, (err) => {
      if (err) console.log(err);
      console.log("Server started at ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("error" + error);
  });
