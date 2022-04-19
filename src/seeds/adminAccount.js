const { hashPassword } = require("../providers/Utilities");

module.exports = [{
  firstName: "Admin",
  middleName: "Test",
  lastName: "Admin",
  email: "admin@example.com",
  password: hashPassword("qwerty123"),
  phoneNumber: "0944848848",
}];
