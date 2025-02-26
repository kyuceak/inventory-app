

const db = require("../db/queries");
const {body, validationResult} = require("express-validator");

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


module.exports = {
    getListCategories,
    renderAddCategoryPage
}