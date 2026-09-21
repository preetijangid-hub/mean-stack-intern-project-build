const { MongoMemoryServer } = require("mongodb-memory-server");

// one-time helper: downloads and caches the in-memory MongoDB binary
(async () => {
  const mongo = await MongoMemoryServer.create();
  console.log("In-memory MongoDB ready at:", mongo.getUri());
  await mongo.stop();
  console.log("Binary cached successfully");
  process.exit(0);
})().catch((error) => {
  console.error("Download failed:", error.message);
  process.exit(1);
});