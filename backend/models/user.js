const db = require("../utils/db");

module.exports = class User {
  constructor(fname, lname, email, pass, username, date) {
    this.firstName = fname;
    this.lastName = lname;
    this.email = email;
    this.password = pass;
    this.username = username;
    this.createdDate = date;
  }

  save() {
    return db.execute(
      "INSERT INTO user (username, first_name, last_name, created_at, email, password) VALUES (?,?,?,?,?,?)",
      [this.username, this.firstName, this.lastName, this.createdDate, this.email, this.password]
    ).catch(error => error + " on save");
  }

  static findUserByEmail(email) {
    return db.execute("SELECT * From user WHERE user.email = ?", [email]);
  }

  static userCounter() {
    return db.execute("SELECT COUNT(*) FROM user")
      .catch(error => error + " on users counter");
  }
};
