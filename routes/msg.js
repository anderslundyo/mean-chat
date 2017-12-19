var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var schema = require('../model/schema');
var database = require('../model/database');

/* GET all messages */
router.get('/get', function(req, res, next) {
    /* schema.Msg.find({}).exec(function (err, msgs) {
        if (err)
            return console.error(err);
        console.log("Load success: ", msgs);
        res.send(msgs);
    });*/
    res.send('respond with a resource');
});


/* POST single Msg post *//*
router.post('/post', function(req, res, next) {
    var instance = new schema.Msg(req.body);


    schema.Msg.find({}).sort({_id:-1}).skip(10).exec(function (err, msgs) {
        console.log("Hallo 2");
        if (err)
            return console.error(err);
        console.log("Loader success: ", msgs);
        msgs.forEach(function(msg){
            console.log("Loader success: ", msg);
            schema.Msg.findByIdAndRemove(msg._id).exec();
        });
    });

    instance.save(function (err, Msg) {
        result = err?err:Msg;
        res.send(result);
        router.notifyclients();
        return result;
    });
});
*/

/* Notify messages to connected clients */
router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients(client);
};
router.notifyclients = function (client) {
    /* schema.Msg.find({}).exec(function (err, msgs) {
        if (err)
            return console.error(err);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('refresh', msgs);
        })
    }); */
}

//export the router
module.exports = router;
