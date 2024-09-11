// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const cors = require("cors");
// const router = require("./Router/NoticeRouter");
// const resour = require("./Router/LibraryItemRouter");
// const userRouter = require("./Router/UserRouter");
// const libraryItemRouter = require("./Router/LibraryItemRouter");
// const LectureRouter = require("./Router/LectureRouter");

// app.use(express.json());
// app.use(cors());
// app.use("/notice", router);
// app.use("/user", userRouter);
// app.use("/Lecture", LectureRouter);

// // app.use("/libarary", libraryItemRouter);
// //app.use("/resource",resour )
// app.use(cors());
// app.use("/pdf", require("./Router/LibraryItemRouter"));
// // app.use("/lecture", require("./Router/LectureRouter"));

// mongoose
//   .connect(
//     "mongodb+srv://seprojectgroup123:L24YBFN5XAKrmSi0@cluster0.t5vme02.mongodb.net/SSD?retryWrites=true&w=majority&appName=Cluster0"
//   )
//   .then(() => console.log("Connected to database"))
//   .then(() => {
//     app.listen(5000);
//   })
//   .catch((err) => console.log(err));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const https = require("https");

// Import Routers
const router = require("./Router/NoticeRouter");
const resour = require("./Router/LibraryItemRouter");
const userRouter = require("./Router/UserRouter");
const libraryItemRouter = require("./Router/LibraryItemRouter");
const LectureRouter = require("./Router/LectureRouter");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use("/notice", router);
app.use("/user", userRouter);
app.use("/Lecture", LectureRouter);

// app.use("/libarary", libraryItemRouter);
// app.use("/resource", resour);
app.use("/pdf", require("./Router/LibraryItemRouter"));
// app.use("/lecture", require("./Router/LectureRouter"));

// Database Connection
mongoose
  .connect(
    "mongodb+srv://seprojectgroup123:L24YBFN5XAKrmSi0@cluster0.t5vme02.mongodb.net/SSD?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// Load the SSL Certificate and Key
const options = {
  key: fs.readFileSync("server.key"), // Path to the private key
  cert: fs.readFileSync("server.cert") // Path to the self-signed certificate
};

// Create an HTTPS server
https.createServer(options, app).listen(443, () => {
  console.log("HTTPS Server running on port 443");
});

