const express = require("express");
const connectdb = require("./../dbconnection");
const Chats = require("../models/ChatSchema");

const router = express.Router();

router.route("/").get((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  connectdb.then(db => {
    let data = Chats.find({ message: "Anonymous" });
    Chats.find({}).then(chat => {
      res.json(chat);
    });
  });
});

module.exports = router;