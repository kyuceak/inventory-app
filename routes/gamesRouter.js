const { Router } = require("express");

const gamesRouter = Router();
const gamesController = require("../controllers/gamesController");
const { validateGame } = require('../controllers/gamesController'); // if exported separately
const upload = require("../multerConfig");


gamesRouter.get("/", gamesController.getListGames);
gamesRouter.get("/new", gamesController.renderAddGamePage);
gamesRouter.post("/new", upload.single("game_file"),validateGame,gamesController.createGame);



module.exports = gamesRouter;