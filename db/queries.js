const pool = require("./pool");

async function getListGames() {
  const { rows } = await pool.query(`SELECT 
    id,
    name,
    to_char(release_date, 'Mon DD YYYY') AS release_date,
    price,
    rating,
    game_image
    FROM games`);
  return rows;
}

async function getItemGames(id) {
  const { rows } = pool.query("SELECT * FROM games WHERE games.id = $1", [id]);
  return rows[0];
}

async function createGame(req) {
  const createdGame = await pool.query(
    "INSERT INTO games (name, release_date, price, rating, game_image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [req.name, req.release_date, req.price, req.rating, req.game_file]
  );
  
  const gameId = createdGame.rows[0].id;


  req.categories.forEach(async (categoryId) => {
    await pool.query(
      "INSERT INTO games_categories (game_id, category_id) VALUES ($1,$2)",
      [gameId, categoryId]
    );
  });
}

async function getListCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");

  return rows;
}

async function createCategory(req) {
  // console.log(req);
  await pool.query("INSERT INTO categories (name,description,category_image) VALUES ($1, $2, $3)", [req.category, req.desc, req.category_file]);
}

module.exports = {
  getListGames,
  getItemGames,
  createGame,
  getListCategories,
  createCategory,
};
