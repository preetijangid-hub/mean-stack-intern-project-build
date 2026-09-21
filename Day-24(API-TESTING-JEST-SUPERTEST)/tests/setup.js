const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

// Runs an in-memory MongoDB for tests so the real database is never touched
let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
}, 60000);

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});
