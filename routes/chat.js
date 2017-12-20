const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const message = require('../model/message');
const Chatroom = require('../model/chatroom');


const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// POST Message
router.post('/send-msg', (req, res, next) => {
    let newMsg = new message({
        username: req.body.username,
        message: req.body.message,
        chatroom: req.body.chatroom
    });

    message.addMessage(newMsg, (err, msg) => {
        if(err){
            console.log("new message failed");
            res.json({success: false, msg: 'Failed to save message'});
        } else{
            console.log("new message succeeded" + msg);
            res.json({success: true, msg: 'Message saved'});
            router.notifyclients(newMsg.chatroom);
        }
    })
});
// POST new chatroom
router.post('/new-chatroom', (req, res, next) => {
    let newRoom = new Chatroom({
        roomname: req.body.roomname,
    });

    Chatroom.addChatroom(newRoom, (err, msg) => {
        if(err){
            res.json({success: false, msg: 'Failed to create new room'});
        } else{
            res.json({success: true, msg: Chatroom.roomname+ ' has been created'});
            router.notifyClientsRooms();
        }
    })
});
//How many sockets is connected on connect
router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients(client);
    console.log('Connected: %s sockets connected', router.clients.length);
};
// Notify users about the new message
router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients(client);
};
// Notifyclients about new msg
//Køres 
router.notifyclients = function (currentRoom) {
    console.log("chat notifyclients kørt: " + currentRoom)
    
    message.find({chatroom: currentRoom}).exec(function (err, message) {
        if (err) {
            console.log("fejll", err)
            return;
        }
        console.log("Beskeder i denne channel" + message)
        io.in(currentRoom).emit('refresh messages', message);
        })
    };

// Notifyclients about new room
router.notifyClientsRooms = function () {
    Chatroom.find({}).exec(function (err, rooms) {
        if (err)
            return console.error(err);

        router.clients.forEach(function(socket){
            socket.emit('refresh chatrooms', rooms);
        })
    });
};
//How many sockets are connected on disconnect
router.disconnectClient = (client) => {
    router.clients.splice(router.clients.indexOf(client), 1);
    console.log('Disconnected: %s sockets connected', router.clients.length);
};
//export the router
module.exports = router;