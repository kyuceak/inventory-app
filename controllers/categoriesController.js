

const db = require("../db/queries");


async function getListCategories(req,res){

    const categories = await db.getListCategories();

    res.render("categories", { categories })
}


module.exports = {
    getListCategories
}