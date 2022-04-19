const GenericValidator = require("../core");
const ObjectId = require("mongoose").Types.ObjectId;

class GetRiderCoordinates extends GenericValidator {
  schema = {
    $$strict: "remove",
    riderId: { type: "string" },
    lat: { type: "number" },
    long: { type: "number" },
  };
}

class RiderLoginValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    email: { type: "email" },
    password: { type: "string", trim: true, min: 5 },
  };
}

class RiderUpdateProfileValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    email: {type: "email", trim: true, optional: true},
    firstName: { type: "string", optional: true },
    lastName: { type: "string", optional: true },
    phoneNumber: { type: "string", optional: true }
  }
}

class GetKycValidator extends GenericValidator {
  schema = {
    $$strict: "remove",
    riderId: { type: "string" },
    file: {
      type: "object",
      props: {
        key: { type: "string" },
        location: { type: "string" }
      }
    }
  };
}

module.exports = {
  RiderLoginValidator,
  GetRiderCoordinates,
  RiderUpdateProfileValidator,
  GetKycValidator
};
