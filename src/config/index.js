const { APP_ENV } = require("../constants");
const { name } = require("../../package.json");

module.exports = {
  app: {
    port: process.env.PORT || 5000,
    secret: process.env.APP_SECRET,
    name: process.env.APP_NAME || name,
    env: process.env.APP_ENV,
    frontendUrl: process.env.FRONTEND_URL,
    baseUrl: process.env.BASE_URL,
  },
  db: {
    name:
      process.env.APP_ENV !== APP_ENV.TEST
        ? process.env.DB_DATABASE
        : process.env.TEST_DB_DATABASE,

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    uri: process.env.DB_URI,
  },
  session: {
    ttl: +(process.env.SESSION_TTL || 1 * 24 * 60 * 60),
  },
  mail: {
    // app_mail: process.env.APP_EMAIL,
    verificationTTL: process.env.EMAIL_VERIFICATION_TTL || "24h",
    from: process.env.APP_EMAIL,
    sgKey: process.env.SENDGRID_KEY,
  },
  map: {
    provider: process.env.GEOCODER_PROVIDER,
    apiKey: process.env.GOOGLE_MAP_API_KEY,
  },
  images: {
    bucketName: process.env.AWS_BUCKET_NAME,
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
  },
  paymentType: {
    orangeMoney: process.env.ORANGE_MONEY,
    africell: process.env.AFRICELL,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_REGION,
  },
};
