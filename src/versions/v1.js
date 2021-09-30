const express = require("express");
const router = express.Router();
const usersRoutes = require("../routes/v1/users");
const gamesRoutes = require("../routes/v1/games");
const playersRoutes = require("../routes/v1/players");
const authentication = require("../middleware/v1/authentication");
const authorization = require("../middleware/v1/authorization");

router.use("/users", usersRoutes);

router.use("/games", authentication);
router.use("/games", authorization("admin"))
router.use("/games", gamesRoutes);

router.use("/players", authentication);
router.use("/players", playersRoutes);

module.exports = router;