const { AuthenticationError, ServiceError } = require("../../exceptions");
const models = require("../../database/models");
const { decodeToken } = require("../../providers/Utilities");

module.exports.adminAuth = async (req, res, next) => {
      try {
        req.session = req.session || {};
        const authorization = req.header("authorization") || "";
        const token = authorization.split(" ")[1];
        if (!token) {
          return next(new AuthenticationError("you need to be authenticated to access this endpoint"));
        }

        const { id } = await decodeToken(token);

        if (!id) {
          return next(new AuthenticationError("unable to verify token"));
        }

        const [session, account] = await Promise.all([
          models.Session.findOne({ token }),
          models.Admin.findById(id),
        ]);

        if (!account && !session) {
          return next(new AuthenticationError("token is invalid"));
        }
        req.session.account = account.toJSON();

        next();
      } catch (e) {
        switch (e.name) {
          case "TokenExpiredError":
            return next(new AuthenticationError("token has expired"));
          case "JsonWebTokenError":
            return next(new AuthenticationError(e.message));
          case "NotBeforeError":
            return next(new AuthenticationError(e.message));
          default:
            return next(e);
        }
      }
  };
