/**
 * Created by Bhanu on 18/03/2016.
 */
module.exports = function (app, formModel) {

    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.post("/api/assignment/form/:formId", updateFormById);

    function createFormForUser(req, res) {
        console.log("createFormForUser");
        var form = req.body;
        form['userId'] = req.params.userId;
        formModel
            .createFormForUser(form)
            .then(success_callback, error_callback);

        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function getFormById(req, res) {
        console.log("getFormById");
        formModel
            .getFormById(req.params.formId)
            .then(success_callback, error_callback);

        function success_callback(response) {
            if (response) {
                res.json(response);
            } else {
                res.status(400).send("Not Found");
            }
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function findAllFormsForUser(req, res) {
        console.log("findAllFormsForUser");
        formModel
            .findAllFormsForUser(req.params.userId)
            .then(success_callback, error_callback);

        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }

    }

    function deleteFormById(req, res) {
        console.log("deleteFormById");
        formModel
            .deleteFormById(req.params.formId)
            .then(success_callback, error_callback);

        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }

    }

    function updateFormById(req, res) {
        console.log("updateFormById");
        var form = req.body;
        formModel
            .updateFormById(req.params.formId, form)
            .then(success_callback, error_callback);

        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }
};