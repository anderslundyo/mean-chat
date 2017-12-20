var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/user');
var database = require('../model/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST single blog post */
router.post('/post', function(req, res, next) {
    var instance = new schema.User(req.body);
    
    schema.User.find({}).sort({_id:-1}).skip(10).exec(function (err, users) {
        if (err)
            return console.error(err);
        users.forEach(function(user){
            console.log("Loader success: ", user);
            schema.User.findByIdAndRemove(user._id).exec();
        });
    });

    instance.save(function (err, User) {
        result = err?err:User;
        res.send(result);
        router.notifyclients();
        return result;
    });
});

router.notifyclients = function (client) {
    console.log("users notifyClients: ");
    /*
    schema.User.find({}).exec(function (err, users) {
        if (err)
            return console.error(err);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('refresh', users);
        })
    });
    */
}
module.exports = router;
