

const { Router } = require("express");

const indexRouter = Router();
const indexController = require("../controllers/indexController.js")




indexRouter.get("/",indexController.viewIndex);





module.exports = indexRouter;