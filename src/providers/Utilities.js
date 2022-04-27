/* eslint-disable no-plusplus */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../config");

exports.comparePassword = async (p1, p2) => bcrypt.compare(p1, p2);

exports.generateToken = (payload, expiresIn = "24h") => jwt.sign(payload, config.app.secret, { expiresIn });

exports.hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

function generateRandomCode(length) {
  return crypto.randomBytes(length * 3)
    .toString("base64")
    .split("+").join("")
    .split("/")
    .join("")
    .split("=")
    .join("")
    .substring(0, length);
}

exports.generateString = (keyLength) => {
  let i;
  let key = "";
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const charactersLength = characters.length;

  for (i = 0; i < keyLength; i++) {
    key += characters.substr(
      Math.floor(Math.random() * charactersLength + 1),
      1,
    );
  }

  return key;
};

exports.successReponse = async (
  res,
  data,
  message = "data has been retrieved",
) => {
  return res.status(200).json({
    status: "success",
    message,
    data,
  });
};

exports.decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.app.secret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

exports.generateRandomToken = () => {
  const token = crypto.randomBytes(64).toString("hex");
  return token;
};

exports.generateRandomNumbers = () => {
  const num = Math.floor(10000 + Math.random() * 90000);
  return num;
};

exports.generateJWTToken = async (payload, secret = config.app.secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign({
      ...payload,
      counter: generateRandomCode(6),
    }, secret, { expiresIn: "720h" }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};

const secretKey = config.app.secret;

exports.encrypt = (text) => {
  const algorithm = 'aes-256-ctr';
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex')
  };
}

exports.decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

  return decrpyted.toString();
}
