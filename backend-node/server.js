require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logger");
const { corsOptions } = require("./config/corsOptions");
const fs = require("fs");
const https = require("https");

// Routes
const rootRoute = require("./routes/root");
const noticeRouter = require("./routes/NoticeRouter");
const userRouter = require("./routes/userRoutes");
const libraryItemRouter = require("./routes/LibraryItemRouter");
const LectureRouter = require("./routes/LectureRouter");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", rootRoute);

app.use("/auth", authRoutes);
app.use("/notice", noticeRouter);
app.use("/user", userRouter);
app.use("/Lecture", LectureRouter);
app.use("/lbitem", require("./routes/LibraryItemRouter"));
app.use("/subject", require("./routes/subjectRoutes"));

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the secure development server!" });
});

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

const privateKey = fs.readFileSync("server.key", "utf8");
const certificate = fs.readFileSync("server.cert", "utf8");
const credentials = { key: privateKey, cert: certificate };

// app.listen(PORT, () => {
//   console.log(`Server is up and running on Port:${PORT}`);
// });

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
