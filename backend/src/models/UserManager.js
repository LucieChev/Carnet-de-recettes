const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (name, email, hashed_password) values (?,?,?)`,
      [user.name, user.email, user.hashed_password]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [user.name, user.id]
    );
  }

  findByEmailWithPassword(email) {
    return this.database.query(`SELECT * FROM ${this.table} where email = ?`, [
      email,
    ]);
  }

  joinRecipeToUser(id) {
    return this.database.query(
      `select r.* from ${this.table} as u
       join recipe as r on r.user_id = u.id
   where u.id = ?`,
      [id]
    );
  }
}
module.exports = UserManager;
