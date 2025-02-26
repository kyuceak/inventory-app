const pool = require("./pool");

async function getListGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function getItemGames(id) {
  const { rows } = pool.query("SELECT * FROM games WHERE games.id = $1", [id]);
  return rows[0];
}

async function createGame(req) {
  const createdGame = await pool.query(
    "INSERT INTO games (name, release_date, price, rating) VALUES ($1, $2, $3, $4) RETURNING *",
    [req.name, req.release_date, req.price, req.rating]
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

async function createCategory() {}

module.exports = {
  getListGames,
  getItemGames,
  createGame,
  getListCategories,
  createCategory,
};
