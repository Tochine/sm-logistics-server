/*
* fastest-validator (https://github.com/icebob/fastest-validator)
* validation type defaults
* */

module.exports.any = { type: "any" };
module.exports.array = { type: "array" };
module.exports.date = { type: "date" };
module.exports.string = { type: "string", empty: false, trim: true };
module.exports.email = { type: "email", normalize: true };
module.exports.uuid = { type: "uuid" };
module.exports.number = { type: "number" };
