const seeder = require("mongoose-seed");
const { dbUri } = require("../connection");
const { hashPassword } = require("../../providers/Utilities");

console.log(dbUri);

// var data = [
//   {
//       'model': 'Admin',
//       'documents': [
//         {
//           "fullName": "Admin Test Admin",
//           "email": "admin@example.com",
//           "password": hashPassword("qwerty123"),
//           "phoneNumber": "0944848848",
//           }
//       ]
//   }
// ];

seeder.connect(dbUri, () => {
  seeder.loadModels(["./src/database/models/Admin.js"]);

  seeder.clearModels(["Admin"], async () => {
    seeder.populateModels([
        {
            'model': 'Admin',
            'documents': [
              {
                "fullName": "Admin Test Admin",
                "email": "admin@example.com",
                "password": await hashPassword("qwerty123"),
                "phoneNumber": "0944848848",
                }
            ]
        }
      ], function() {
      seeder.disconnect();
    })
  })
});