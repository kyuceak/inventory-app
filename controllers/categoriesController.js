

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

    upload.single("category_file")(req, res, async (err) => {

        if(err){
            return res.status(500).send(err.message);
        }

        const categoryData = {
            ...req.body,
            category_file: req.file ? req.file.buffer : null
        }

        console.log(categoryData);

        await db.createCategory(categoryData);

    res.redirect("/categories");
    });
    
}


module.exports = {
    getListCategories,
    renderAddCategoryPage,
    createCategory
}