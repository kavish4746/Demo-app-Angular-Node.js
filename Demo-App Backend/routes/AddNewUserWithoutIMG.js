var express = require("express");
var user = require("../Models/user");
var router = express.Router();

router.post("/", (req, res) => {
  if (/^[a-zA-Z0-9]*$/.test(req.body.name) == false) {
    res.status(602).send("Please Dont use special character");
  } else {
    user.addnewUserWithoutIMG(req.body, (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

module.exports = router;
