var express = require('express');
 
// Get the router
var router = express.Router();
 
var Poll = require('./models/poll');
var User = require('./models/user');
 
// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});
 
// Welcome message for a GET at http://localhost:8080/restapi
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the REST API' });   
});
 
// GET all polls (using a GET at http://localhost:8080/polls)
router.route('/polls')
    .get(function(req, res) {
        Poll.find(function(err, polls) {
            if (err)
                res.send(err);
            res.json(polls);
        });
    });

// Create a poll (using POST at http://localhost:8080/polls)
router.route('/polls')
    .post(function(req, res) {
        var poll = new Poll();
        // Set text and user values from the request
    poll.title = req.body.title;
    poll.date = req.body.date;
    poll.optionsCount = req.body.optionsCount;
    poll.latitude = req.body.latitude;
    poll.longitude = req.body.longitude;
 
        // Save poll and check for errors
        poll.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Poll created successfully!' });
        });
    });

router.route('/polls/:poll_id')
    // GET poll with id (using a GET at http://localhost:8080/polls/:poll_id)
    .get(function(req, res) {
        Poll.findById(req.params.poll_id, function(err, poll) {
            if (err)
                res.send(err);
            res.json(poll);
        });
    })
 
    // Update poll with id (using a PUT at http://localhost:8080/polls/:poll_id)
    .put(function(req, res) {
        Poll.findById(req.params.poll_id, function(err, poll) {
            if (err)
                res.send(err);
            // Update the poll text
        poll.title = req.body.title;
            poll.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Poll successfully updated!' });
            });
 
        });
    })
 
    // Delete poll with id (using a DELETE at http://localhost:8080/polls/:poll_id)
    .delete(function(req, res) {
        Poll.remove({
            _id: req.params.message_id
        }, function(err, message) {
            if (err)
                res.send(err);
 
            res.json({ message: 'Successfully deleted poll!' });
        });
    });  

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// User model
// GET all users (using a GET at http://localhost:8080/users)
router.route('/users')
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

// Create a user (using POST at http://localhost:8080/users)
router.route('/users')
    .post(function(req, res) {
        var user = new User();
        // Set text and user values from the request
    user.name = req.body.name;
    user.email = req.body.email;
    user.id = req.body.id;
 
        // Save user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User created successfully!' });
        });
    });

router.route('/users/:user_id')
    // GET user with id (using a GET at http://localhost:8080/users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
 
    // Update user with id (using a PUT at http://localhost:8080/users/:user_id)
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            // Update the poll text
        user.name = req.body.name;
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'User successfully updated!' });
            });
 
        });
    })
 
    // Delete user with id (using a DELETE at http://localhost:8080/users/:user_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, message) {
            if (err)
                res.send(err);
 
            res.json({ message: 'Successfully deleted user!' });
        });
    });  

 
module.exports = router;
 
function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}