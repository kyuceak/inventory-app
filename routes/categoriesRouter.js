const { Router } = require("express");

const categoriesRouter = Router();
const categoriesController = require("../controllers/categoriesController");


categoriesRouter.get("/",categoriesController.getListCategories);
categoriesRouter.get("/new", categoriesController.renderAddCategoryPage);


module.exports = categoriesRouter;