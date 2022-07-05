const mongoose = require("mongoose");
mongoose.Promise = require("bluebird"); //changes the promise type Mongoose uses to the promises in the bluebird library
const url="mongodb://localhost:27017/chat";
const connect = mongoose.connect(url, {useNewUrlParser: true});
module.exports = connect;