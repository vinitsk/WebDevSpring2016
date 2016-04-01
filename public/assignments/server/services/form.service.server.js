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
        var form = {'_id': req.params.formId};
        formModel
            .getFormById(form)
            .then(success_callback, error_callback);

        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function findAllFormsForUser(req, res) {
        console.log("findAllFormsForUser");
        var form = {'userId': req.params.userId};
        formModel
            .findAllFormsForUser(form)
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
        var form = {'_id': req.params.formId};
        formModel
            .deleteFormById(form)
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