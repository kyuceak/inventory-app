

const db = require("../db/queries");


async function getListGames(req,res){


    const games = await db.getListGames();


    res.render("item",{ games });
}

function renderAddGamePage(req,res){
    res.render("addItem");
}

async function createGame(req,res){


    await db.createGame(req.body);

    res.redirect("item");


}





module.exports = {
    getListGames,
    renderAddGamePage,
    createGame
}