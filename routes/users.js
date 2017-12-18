var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST single blog post */
router.post('/post', function(req, res, next) {
    var instance = new schema.User(req.body);

    schema.User.find({}).sort({_id:-1}).skip(10).exec(function (err, users) {
        console.log("Hallo 2");
        if (err)
            return console.error(err);
        console.log("Loader success: ", users);
        users.forEach(function(blog){
            console.log("Loader success: ", user);
            schema.User.findByIdAndRemove(user._id).exec();
        });
    });

    instance.save(function (err, User) {
        result = err?err:Blog;
        res.send(result);
        router.notifyclients();
        return result;
    });
});

module.exports = router;
