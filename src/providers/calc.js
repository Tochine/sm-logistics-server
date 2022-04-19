// Converts numeric degrees to radians
function numToRad(Value) {
  return (Value * Math.PI) / 180;
}

// This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
module.exports.calcCrow = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // radius of the earth in km
  const dLat = numToRad(lat2 - lat1);
  const dLon = numToRad(lon2 - lon1);
  const lati1 = numToRad(lat1);
  const lati2 = numToRad(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lati1) * Math.cos(lati2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};
