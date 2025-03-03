const { Router } = require("express");

const categoriesRouter = Router();
const categoriesController = require("../controllers/categoriesController");
const { validateCategory } = require("../controllers/categoriesController");
const upload = require("../multerConfig");

categoriesRouter.get("/", categoriesController.getListCategories);
categoriesRouter.get("/new", categoriesController.renderAddCategoryPage);
categoriesRouter.get("/:id", categoriesController.fetchGamesByCategoryId);
categoriesRouter.post("/new", upload.single("category_file"),validateCategory,categoriesController.createCategory);

module.exports = categoriesRouter;
