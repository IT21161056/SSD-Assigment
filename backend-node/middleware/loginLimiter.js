const loginLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

const loginLimiter = loginLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 2, // limit each IP to 5 login requests per `window` per minute
  message: {
    message:
      "Too many login attempts from this IP, please try again after a 60 second pause",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too many RequestsL ${options.message.message}\t${req.method}\t${req.url}\t
            ${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).json(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
