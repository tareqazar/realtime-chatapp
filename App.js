const express = require("express");
const app = express();
const http = require("http").Server(app);
const io= require("socket.io");
const port = 5000;
const socket = io(http);

const Chat = require("./models/Chat");
const connect = require("./dbconnect")
const bodyParser = require("body-parser");
const chatRouter = require("./route/chatroute");
//socket.on("connection", (socket)=> {console.log("user connected");});

app.use("/chats", chatRouter);

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

socket.on("connection", (client)=>{
    console.log("user connected");
    client.on("disconnect", function(){
        console.log("Disconnected");
    })
    client.on("tariq", function(msg) {
        console.log("message: "  +  msg);
        //broadcast message to everyone in port:5000 except yourself.
        client.broadcast.emit("received", {message: msg});
        
        connect.then(db => {
            console.log("connected correctly to the DB");
        })
        let chatMessage= new Chat({message: msg, sender: "Anonymous"});
        chatMessage.save();
    });
    client.on("typing", data => {
        console.log("typing event is seen by server");
        client.broadcast.emit("notifyTyping", {message: "Someone is typing..."});

    })
});





http.listen(port, ()=>{console.log("Connected to port" + port)});



socket.on('stopTyping', ()=>{
    socket.broadcast.emit("notifyStopTyping");
});

socket.on("retrieve_chats", ()=>{
    connect.then({
        
    })
})