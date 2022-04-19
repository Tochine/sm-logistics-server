const { faker } = require("@faker-js/faker");
const {
  beforeAll,
  describe,
  expect,
  it,
  afterAll,
} = require("@jest/globals");
const request = require("supertest");
const _ = require("lodash");
const random = require("lodash/random");
const config = require("../../src/config");

const {
  addEndpoint,
  renderDocumentation,
} = require("../documentation");

const db = require("../../src/database");
const app = require("../../src/server");

const server = request(app);

const { generateRandomNumbers } = require("../../src/providers/Utilities");

const state = {
  sessions: [],
};

/*
* Mocks
* */

jest.mock("lodash/random");
random.mockReturnValue(1234);

beforeAll(async () => {
  state.connection = await db.createConnection(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
  for (const model in db.models) {
    if (db.models.hasOwnProperty(model)) {
      await db.models[model].deleteMany({});
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 15000));
});

afterAll(async () => {
  await state.connection.close();
  renderDocumentation();
  await new Promise((resolve) => setTimeout(resolve, 15000));
});

/*
* Tests
* */
describe("Authentication", () => {
  jest.setTimeout(30000);

  const data = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.phoneNumber(),
  };
  const otp = generateRandomNumbers();
  data.otp = otp;

  describe("Register Client", () => {
    it("should register a dispatch rider", async () => {
      const res = await server
        .post("/auth/register")
        .send({ ...data });

      expect(res.statusCode).toEqual(200);
      addEndpoint(res);
    });
  });

  describe("Register Rider", () => {
    it("should register a dispatch rider", async () => {
      const res = await server
        .post("/riders/auth/register")
        .send({ ...data });

      expect(res.statusCode).toEqual(200);
      addEndpoint(res);
    });
  });
});
