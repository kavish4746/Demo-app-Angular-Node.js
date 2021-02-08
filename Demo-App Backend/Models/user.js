var db = require("../dbconnection");
var user = {
  addnewUser: function (item, filename, callback) {
    console.log(item);
    return db.query(
      "insert into user_tbl (name,email,img) values (?,?,?)",
      [item.name, item.email, filename],
      callback
    );
  },
  addnewUserWithoutIMG: function (item, callback) {
    console.log(item);
    let filename = "default_img.png";
    return db.query(
      "insert into user_tbl (name,email,img) values (?,?,?)",
      [item.name, item.email, filename],
      callback
    );
  },
  getAlluser: function (callback) {
    return db.query("select * from user_tbl", callback);
  },
  getuserByid: function (id, callback) {
    return db.query("select * from user_tbl where id=?", [id], callback);
  },
  deleteUser: function (id, callback) {
    return db.query("delete from user_tbl where id=?", [id], callback);
  },
  sortByDesc: function (callback) {
    return db.query("SELECT * FROM user_tbl ORDER BY name DESC", callback);
  },
  sortByAsc: function (callback) {
    return db.query("SELECT * FROM user_tbl ORDER BY name Asc", callback);
  },
  updateuserwithoutIMG: function (item, callback) {
    return db.query(
      "update user_tbl set name=?,email=? where id=?",
      [item.name, item.email, item.id],
      callback
    );
  },
  updateuserwithIMG: function (item, filename, callback) {
    return db.query(
      "update user_tbl set name=?,email=?,img=? where id=?",
      [item.name, item.email, filename, item.id],
      callback
    );
  },
};

module.exports = user;
