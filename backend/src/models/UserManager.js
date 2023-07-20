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
}
module.exports = UserManager;
