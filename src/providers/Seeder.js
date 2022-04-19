const seeder = require("mongoose-seed");
const { dbUri } = require("../database");

// const models = ["ItemCategory", "ItemWeight"];

const models = ["AdminAccount"];

const data = [
//   {
//     model: "ItemCategory",
//     documents: require("../seeds/itemCategory.js"),
//   },
//   {
//     model: "ItemWeight",
//     documents: require("../seeds/itemWeight.js"),
//   },
  {
    model: "AdminAccount",
    documents: require("../seeds/adminAccount.js"),
  },

];

console.log(dbUri);
// Connect to MongoDB via Mongoose
seeder.connect(dbUri, () => {
  // Load Mongoose models
  // seeder.loadModels(models.map((model) => `./src/models/${model}.js`));
  seeder.loadModels(models.map((model) => `./src/models/Admins/${model}.js`));

  // Clear specified collections
  seeder.clearModels(models, () => {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});
