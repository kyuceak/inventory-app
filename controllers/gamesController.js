
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const upload = require("../multerConfig");

const categorySelectError = "You must select at least 1 category.";


const validateGame = [
    body("categories").customSanitizer(value => {
        console.log(value);
        if(value == undefined || value == null){
            return [];
        }
        
        return Array.isArray(value) ? value : [value];
    }),
    body("categories").custom(arr => arr.length > 0).withMessage(categorySelectError),
   
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

     



        // console.log(req.body);
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {   
          
            const categories = await db.getListCategories();
            return res.status(400).render("addItem",{errors: errors.array(), categories})
        }
    
        


        const gameData = {
            ...req.body,
            game_file: req.file ? req.file.buffer: null
        }
        
     
        await db.createGame(gameData);
    
        res.redirect("/games");
    





}





module.exports = {
    getListGames,
    renderAddGamePage,
    createGame,
    validateGame
}