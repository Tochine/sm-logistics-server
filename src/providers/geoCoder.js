const NodeGeoCoder = require("node-geocoder");
const config = require("../config");

exports.geoCoder = () => {
  const options = {
    provider: "google",
    // httpAdapter: "https",
    apiKey: config.map.apiKey,
    formatter: null,
  };

  return NodeGeoCoder(options);
};

// module.exports = geocoder;
