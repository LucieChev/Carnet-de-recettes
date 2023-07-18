const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (name, mail_address) values (?,?)`,
      [user.name, user.mail_address]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [user.name, user.id]
    );
  }
}

module.exports = ItemManager;
