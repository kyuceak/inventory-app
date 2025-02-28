
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const upload = require("../multerConfig");

const categorySelectError = "You must select at least 1 category.";
const nameError = "You must enter a valid game name";

const validateGame = [
    body("categories").customSanitizer(value => {
        if(value == undefined || value == null){
            return [];
        }
        console.log(value)
        return Array.isArray(value) ? value : [value];
    }),
    body("categories").custom(arr => arr.length > 0).withMessage(categorySelectError),
    body("name").isAlpha().withMessage(nameError),
]


async function getListGames(req,res){


    const games = await db.getListGames();


    res.render("item",{ games });
}

async function renderAddGamePage(req,res){

    const categories = await db.getListCategories();

    res.render("addItem", {categories});
}

async function createGame(req,res){

    upload.single("game_file")(req, res, async (err) => {

        const errors = validationResult(req);
        if(!errors.isEmpty())
        {   
            const categories = await db.getListCategories();
            return res.status(400).render("addItem",{errors: errors.array(), categories})
        }
    
        


        const gameData = {
            ...req.body,
            game_file: req.file ? req.file.filename: null
        }

        await db.createGame(gameData);
    
        res.redirect("/games");
    

    });



}





module.exports = {
    getListGames,
    renderAddGamePage,
    createGame,
    validateGame
}