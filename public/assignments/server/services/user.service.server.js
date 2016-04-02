/**
 * Created by Bhanu on 18/03/2016.
 */
module.exports = function (app, userModel) {

    app.get("/api/assignment/user", findUser);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function deleteUser(res, response) {
        console.log("Delete User");
        var user = {
            _id: req.params.id
        };
        userModel
            .deleteUserById(user)
            .then(success_callback, error_callback);

        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function updateUser(req, res) {
        var user = req.body;
        console.log("updateUser");
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
            findUserByCredentials(req, res,req.query.username ,req.query.password);
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
            .createUser(user)
            .then(success_callback, error_callback);

        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function findUserByCredentials(req, res, username, password) {
        console.log("findUserByCredentials");
        userModel
            .findUserByCredentials(username,password)
            .then(success_callback, error_callback);

        function success_callback(response) {
            if(response){
                res.json(response);
            }else{
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
            if(response){
                res.json(response);
            }else{
                res.status(400).send("User Not Found")
            }
        }

        function error_callback(error) {
            res.status(400).send(error);
        }

    }
};