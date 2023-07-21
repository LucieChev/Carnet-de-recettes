const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  insert(recipe) {
    return this.database.query(
      `insert into ${this.table} (title, description, user_id) values (? ,?,?)`,
      [recipe.title, recipe.description, recipe.user_id]
    );
  }

  update(recipe) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [recipe.title, recipe.id]
    );
  }
}

module.exports = RecipeManager;
