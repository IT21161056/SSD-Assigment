const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

const rateLimitter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per `window` per minute
  message: {
    message:
      "Too many request attempts from this IP, please try again after a 60 second pause",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too many RequestsL ${options.message.message}\t${req.method}\t${req.url}\t
            ${req.headers.origin}`,
      "reqLog.log"
    );
    res.status(options.statusCode).json(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimitter;
