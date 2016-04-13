/**
 * Created by Bhanu on 18/03/2016.
 */
/*Local Strategy*/
var LocalStrategy = require('passport-local').Strategy,
    bcrypt = require("bcrypt-nodejs");

module.exports = function (app, userModel, passport) {

    app.get("/api/assignment/user", findUser);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/logout', logout);
    app.get('/api/assignment/loggedin', loggedin);
    app.post('/api/assignment/register', register);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        console.log("localStrategy");
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log(user);
                    // if the user exists, compare passwords with bcrypt.compareSync
                    if (user && bcrypt.compareSync(password, user.password)) {
                        console.log("Password matched");
                        return done(null, user);
                    } else {
                        console.log("Password do not match");
                        return done(null, false);
                    }
                },
                function (err) {
                    console.log(err);
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel.findUserById(user._id)
            .then(function (user) {
                delete user.password;
                done(null, user);
            }, function () {
                done(err, null);
            });
    }


    function deleteUser(req, res) {
        console.log("Delete User");
        userModel
            .deleteUserById(req.params.id)
            .then(success_callback, error_callback);

        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }


    function updateUser(req, res) {
        var user = req.body;
        console.log("updateUser");
        console.log(user);
        if (user.password) {
            user.password = bcrypt.hashSync(user.password);
        }
        userModel
            .updateUser(req.params.id, user)
            .then(success_callback, error_callback);

        function success_callback(response) {
            console.log(response);
            res.json(response);
        }

        function error_callback(error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    function findUserById(req, res) {
        console.log("findUserById");
        userModel
            .findUserById(req.params.id)
            .then(success_callback, error_callback);

        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }


    function findUser(req, res) {
        var credentials = req.body;
        if (req.query.username && req.query.password) {
            findUserByCredentials(req, res, req.query.username, req.query.password);
        } else if (req.query.username) {
            findUserByUsername(req, res, req.query.username);
        }
        else {
            findAllUsers(req, res)
        }
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(success_callback, error_callback);

        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function createUser(req, res) {
        console.log("createUser");
        var user = req.body;
        userModel
            .findUserByUsername(user.username)
            .then(
                function (response) {
                    if (response) {
                        res.json("User already exist. Please login.");
                    } else {
                        // encrypt the password when registering
                        user.password = bcrypt.hashSync(user.password);
                        return userModel.createUser(user);
                    }
                },
                function (err) {a
                    res.status(400).send(err);
                }
            )
            .then(function (user) {
                res.json(user);
            }, function (err) {
                console.log(err)
            });

    }

    function findUserByCredentials(req, res, username, password) {
        console.log("findUserByCredentials");
        userModel
            .findUserByCredentials(username, password)
            .then(success_callback, error_callback);

        function success_callback(response) {
            if (response) {
                res.json(response);
            } else {
                res.status(400).send("User Not Found")
            }
        }

        function error_callback(error) {
            res.status(400).send(error);
        }

    }

    function findUserByUsername(req, res, user) {
        console.log("findUserByUsername");
        userModel
            .findUserByUsername(user)
            .then(success_callback, error_callback);

        function success_callback(response) {
            if (response) {
                res.json(response);
            } else {
                res.status(400).send("User Not Found")
            }
        }

        function error_callback(error) {
            res.status(400).send(error);
        }

    }

    function register(req, res) {
        var user = req.body;
        userModel
            .findUserByUsername(user.username)
            .then(
                function (response) {
                    if (response) {
                        res.json("User already exist. Please login.");
                    } else {
                        // encrypt the password when registering
                        user.password = bcrypt.hashSync(user.password);
                        return userModel.createUser(user);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                delete user.password;
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};