var express = require("express");
var user = require("../Models/user");
var router = express.Router();

var multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    x = file.originalname + "-" + Date.now() + path.extname(file.originalname);
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage });

router.get("/", (req, res) => {
  user.getAlluser((err, rows) => {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get("/:id", (req, res) => {
  user.getuserByid(req.params.id, (err, rows) => {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("", upload.single("img"), (req, res) => {
  user.addnewUser(req.body, req.file.filename, (err, rows) => {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.delete("/:id", (req, res) => {
  user.deleteUser(req.params.id, (err, rows) => {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.put("/", (req, res) => {
  user.updateuserwithoutIMG(req.body, (err, rows) => {
    console.log(req.body);
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;
