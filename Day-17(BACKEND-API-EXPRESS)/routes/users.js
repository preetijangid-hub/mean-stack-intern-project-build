const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Preeti" },
    { id: 2, name: "User 2" }
  ]);
});

router.get("/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "User"
  });
});

module.exports = router;
