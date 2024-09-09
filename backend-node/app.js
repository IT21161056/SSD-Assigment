const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const router = require("./Router/NoticeRouter");
const resour = require("./Router/LibraryItemRouter");
const userRouter = require("./Router/UserRouter");
const libraryItemRouter = require("./Router/LibraryItemRouter");
const LectureRouter = require("./Router/LectureRouter");

app.use(express.json());
app.use(cors());
app.use("/notice", router);
app.use("/user", userRouter);
app.use("/Lecture", LectureRouter);

// app.use("/libarary", libraryItemRouter);
//app.use("/resource",resour )
app.use(cors());
app.use("/pdf", require("./Router/LibraryItemRouter"));
// app.use("/lecture", require("./Router/LectureRouter"));

mongoose
  .connect(
    "mongodb+srv://seprojectgroup123:L24YBFN5XAKrmSi0@cluster0.t5vme02.mongodb.net/SSD?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
