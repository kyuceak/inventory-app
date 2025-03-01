const { Router } = require("express");

const categoriesRouter = Router();
const categoriesController = require("../controllers/categoriesController");


categoriesRouter.get("/",categoriesController.getListCategories);
categoriesRouter.get("/new", categoriesController.renderAddCategoryPage);
categoriesRouter.get("/:id", categoriesController.fetchCategoryById)
categoriesRouter.post("/new", categoriesController.createCategory);

module.exports = categoriesRouter;