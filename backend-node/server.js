require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logger");
const { corsOptions } = require("./config/corsOptions");

// Routes
const rootRoute = require("./routes/root");
const noticeRouter = require("./routes/NoticeRouter");
const userRouter = require("./routes/userRoutes");
const libraryItemRouter = require("./routes/LibraryItemRouter");
const LectureRouter = require("./routes/LectureRouter");

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", rootRoute);

app.use("/notice", noticeRouter);
app.use("/user", userRouter);
app.use("/Lecture", LectureRouter);
app.use("/pdf", require("./routes/LibraryItemRouter"));
// app.use("/libarary", libraryItemRouter);
//app.use("/resource",resour )
// app.use("/lecture", require("./Router/LectureRouter"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Fund");
  }
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
