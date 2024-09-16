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
const PORT = process.env.PORT || 5001;

connectDB();

app.use(logger);

//app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000'
}));

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

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the secure development server!' });
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

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Load the SSL Certificate and Key
// const options = {
//   key: fs.readFileSync("server.key", 'utf8'), // Path to the private key
//   cert: fs.readFileSync("server.cert", 'utf8') // Path to the self-signed certificate
// };

const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };
console.log(privateKey);
console.log(certificate);


 
// Create HTTPS server
const httpsServer = https.createServer(credentials, app);
 
httpsServer.listen(443, () => {
  console.log('HTTPS Server running on https://localhost:443');
});
 

 

// // Create an HTTPS server
// https.createServer(options, app).listen(5000, () => {
//   console.log("HTTPS Server running on port 443");
// });
