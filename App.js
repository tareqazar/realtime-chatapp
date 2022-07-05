const express = require("express");
const app = express();
const http = require("http").Server(app);
const io= require("socket.io");
const port = 500;
const socket = io(http);

const Chat = require("./models/ChatSchema");
const connect = require("./dbconnection")
const bodyParser = require("body-parser");
const chatRouter = require("./route/chatroute");
//socket.on("connection", (socket)=> {console.log("user connected");});

app.use("/chats", chatRouter);

app.use(bodyParser.json());

socket.on("connection", (socket)=>{
    console.log("user connected");
    socket.on("disconnect", ()=>{
        console.log("Disconnected");
    })
});
http.listen(port, ()=>{console.log("Connected to port" + port)});

socket.on("chat message", function(msg) {
    console.log("message: "  +  msg);
    //broadcast message to everyone in port:5000 except yourself.
    socket.broadcast.emit("received", {message: msg});
    
    connect.then(db => {
        console.log("connected correctly to the server");
    })
    let chatMessage= new Chat({message: msg, sender: "Anonymous"});
    chatMessage.save();
});

    
