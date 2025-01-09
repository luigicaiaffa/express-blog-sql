// # Configurazione
const express = require("express");
const router = express.Router();

// # Rotte
const routeFunction = require("../controllers/postscontroller");

// index
router.get("/", routeFunction.index);

// show
router.get("/:id", routeFunction.show);

// create
router.post("/", routeFunction.create);

// update
router.put("/:id", routeFunction.update);

// modify
router.patch("/:id", routeFunction.modify);

// destroy
router.delete("/:id", routeFunction.destroy);

module.exports = router;
