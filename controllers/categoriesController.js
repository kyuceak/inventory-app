

const db = require("../db/queries");
const {body, validationResult} = require("express-validator");
const upload = require("../multerConfig");

const validateCategory = [
    body("name").isAlpha().withMessage()
]


async function getListCategories(req,res){

    const categories = await db.getListCategories();

    res.render("categories", { categories })
}

function renderAddCategoryPage(req,res){
    res.render("addCategory");
}

async function createCategory(req,res){

    await db.createCategory(req.body);

    res.render("/categories");
}


module.exports = {
    getListCategories,
    renderAddCategoryPage,
    createCategory
}