const { Router } = require("express");

const gamesRouter = Router();
const gamesController = require("../controllers/gamesController");



gamesRouter.get("/", gamesController.getListGames);
gamesRouter.get("/new", gamesController.renderAddGamePage);
gamesRouter.post("/new", gamesController.createGame);



module.exports = gamesRouter;