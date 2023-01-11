const db = require("../utils/db");

module.exports = class User {
  constructor(fname, lname, email, pass, username) {
    this.firstName = fname;
    this.lastName = lname;
    this.email = email;
    this.password = pass;
    this.username = username;
  }

  save() {
    db.execute(
      "INSERT INTO user (username, first_name, last_name, email, password) VALUES (?,?,?,?,?)",
      [this.username, this.firstName, this.lastName, this.email, this.password]
    );
  }
};
