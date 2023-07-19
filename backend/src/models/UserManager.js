const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (name, mail_address, hashed_password) values (?,?,?)`,
      [user.name, user.mail_address, user.hashed_password]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [user.name, user.id]
    );
  }

  findByEmailWithPassword(email) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE mail_address = ?`,
      [email]
    );
  }

  findUserByEmail(email) {
    return this.database.query(
      `SELECT id FROM ${this.table} WHERE mail_address = ?`,
      [email]
    );
  }
}

module.exports = ItemManager;
