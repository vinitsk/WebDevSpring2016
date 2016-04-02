/**
 * Created by Bhanu on 18/03/2016.
 */

module.exports = function (app, fieldModel) {

    app.get("/api/assignment/form/:formId/field", getAllFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFormField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormField);
    app.post("/api/assignment/form/:formId/field", createNewFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormField);
    app.put("/api/assignment/form/:formId/fields", updateAllFormFields);


    function getAllFormFields(req, res) {
        console.log("getAllFormFields");
        fieldModel
            .getAllFormFields(req.params.formId)
            .then(success_callback, error_callback);
        function success_callback(response) {
            console.log(response.fields);
            res.json(response.fields);
        }
        function error_callback(err) {
            res.status(400).send(err);
        }
    }

    function getFormField(req, res) {
        console.log("getFormField");
        fieldModel
            .getFormField(req.params.formId,req.params.fieldId)
            .then(success_callback, error_callback);
        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function deleteFormField(req, res) {
        console.log("deleteFormField");
        fieldModel
            .deleteFormField(req.params.formId, req.params.fieldId)
            .then(success_callback, error_callback);
        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function createNewFormField(req, res) {
        console.log("createNewFormField");
        var field = req.body;
        fieldModel
            .createNewFormField(req.params.formId, field)
            .then(success_callback, error_callback);
        function success_callback(response) {
            console.log(response.fields);
            res.json(response.fields);
        }
        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function updateFormField(req, res) {
        console.log("updateFormField");
        var field = req.body;
        fieldModel
            .updateFormField(req.params.formId, req.params.fieldId, field)
            .then(success_callback, error_callback);
        function success_callback(response) {
            console.log(response.fields);
            res.json(response.fields);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function updateAllFormFields(req, res) {
        console.log("updateAllFormFields");
        var fields = req.body;
        fieldModel
            .updateAllFormFields(req.params.formId, fields)
            .then(success_callback, error_callback);
        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }

    }

};