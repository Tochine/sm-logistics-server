const RequestIp = require("@supercharge/request-ip");

module.exports.getIpAndUserAgent = (req, res, next) => {
  try {
    req.ip = RequestIp.getClientIp(req);
    req.useragent = req.get("User-Agent");
    return next();
  } catch (error) {
    next(error);
  }
};
