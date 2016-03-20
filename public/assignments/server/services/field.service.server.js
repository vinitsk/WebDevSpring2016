/**
 * Created by Bhanu on 18/03/2016.
 */

module.exports = function (app, formModel) {

    app.get("/api/assignment/form/:formId/field", getAllFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFormField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormField);
    app.post("/api/assignment/form/:formId/field", createNewFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormField);
    app.put("/api/assignment/form/:formId/fields", updateAllFormFields);


    function getAllFormFields(req, res) {
        console.log("getAllFormFields");
        formModel
            .getAllFormFields(req.params.formId)
            .then(success_callback, error_callback);
        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function getFormField(req, res) {
        console.log("getFormField");
        formModel
            .getFormField(req.params.formId, req.params.fieldId)
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
        formModel
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
        formModel
            .createNewFormField(req.params.formId, field)
            .then(success_callback, error_callback);
        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function updateFormField(req, res) {
        console.log("updateFormField");
        var field = req.body;
        formModel
            .updateFormField(req.params.formId, req.params.fieldId, field)
            .then(success_callback, error_callback);
        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }
    }

    function updateAllFormFields(req, res){
        console.log("updateAllFormFields");
        var fields = req.body;
        formModel
            .updateAllFormFields(req.params.formId, fields)
            .then(success_callback, error_callback);
        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            res.status(400).send(error);
        }

    }

}