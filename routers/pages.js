// # Configurazione
const express = require("express");
const router = express.Router();

// homepage
router.get("/", (req, res) => {
  res.json("Server del mio blog");
});

module.exports = router;
