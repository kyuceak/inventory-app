

const db = require("../db/queries");
const {body, validationResult} = require("express-validator");
const upload = require("../multerConfig");


const lengthErr = "Category name must be shorter 12 characters."


const validateCategory = [
    body("name").isLength({min:3 ,max: 12}).withMessage(lengthErr)
]


async function getListCategories(req,res){

    const categories = await db.getListCategories();
  

    res.render("categories", { categories })
}

function renderAddCategoryPage(req,res){
    res.render("addCategory");
}

async function createCategory(req,res){

    // upload.single("category_file")(req, res, async (err) => {

        // if(err){
        //     return res.status(500).send(err.message);
        // }


        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).render("addCategory", {errors: errors.array()});
            
        }

        const categoryData = {
            ...req.body,
            category_file: req.file ? req.file.buffer : null
        }

      

        await db.createCategory(categoryData);

    res.redirect("/categories");
    // });
    
}

async function fetchGamesByCategoryId(req,res){

    const gamesByCategory = await db.getListGamesByCategory(req.params.id);

    console.log("burdayiz: ", gamesByCategory.categoryInfo);

    res.render("categoryDetail", { gamesByCategory:gamesByCategory.rows, categoryInfo: gamesByCategory.categoryInfo});
}


module.exports = {
    getListCategories,
    renderAddCategoryPage,
    createCategory,
    fetchGamesByCategoryId,
    validateCategory
}