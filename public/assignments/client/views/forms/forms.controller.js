/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController(FormService, $rootScope, $location, $routeParams) {

        var FormsController = this;
        FormsController.userId = $routeParams.userId;
        function init() {
            if (!$rootScope.user) {
                $location.url("/");
            }
            FormsController.form_id = "";
            //Setting the forms from the scope to populate UI
            getAllFormsForUser();
        }

        init();

        //Event Handlers Decelerations
        FormsController.addForm = addForm;
        FormsController.updateForm = updateForm;
        FormsController.deleteForm = deleteForm;
        FormsController.selectForm = selectForm;
        FormsController.openForm = openForm;

        //Data Population Functions
        function getAllFormsForUser() {
            if (!FormsController.userId) {
                return;
            }
            FormService
                .findAllFormsForUser(FormsController.userId)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    console.log(response);
                    FormsController.forms = response.data;
                }
            }

            function error_callback(error) {
                console.log(error);
            }
        }

        function updateFormToScope(response) {
            if (Array.isArray(response)) {
                FormsController.forms = response;
            } else {
                var scopeForms = FormsController.forms;
                scopeForms.push(response);
                FormsController.forms = scopeForms;
            }
        }

        //Event Handlers Implementations
        function addForm(form_title) {
            if (!form_title || form_title === "") {
                return;
            }
            var form = {
                title: form_title
            };
            FormService
                .createFormForUser($rootScope.user._id, form)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    console.log(response);
                    FormsController.forms = response.data;
                    FormsController.form_title = "";
                    //Updating the model with the newly added form.
                    //updateFormToScope(response);
                    //There is a totally wired thing happening, where while adding form, the new form gets
                    //added to the scope automatically.
                    getAllFormsForUser();
                }
            }

            function error_callback(error) {
                console.log(error);
            }
        }

        function updateForm() {
            if (!FormsController.form_id || FormsController.form_id === "") {
                return;
            }
            var newUserForm = {
                "title": FormsController.form_title,
                "userId": $rootScope.user._id
            };
            FormService
                .updateFormById(FormsController.form_id, newUserForm)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    FormsController.form_title = "";
                    FormsController.form_id = "";
                    getAllFormsForUser();
                }
            }

            function error_callback(error) {
                console.log(error);
            }
        }

        function deleteForm(formId) {
            FormService
                .deleteFormById(formId)
                .then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response);
                getAllFormsForUser()
            }

            function error_callback(error) {
                console.log(error);
            }
        }

        function selectForm(formId, formTitle) {
            FormsController.form_id = formId;
            FormsController.form_title = formTitle;
        }

        function openForm(formId, formTitle) {
            var newForm = {
                _id: formId,
                title: formTitle
            };
            $rootScope.form = newForm;
            $location.url("/" + $rootScope.user._id + "/" + formId + "/fields");
        }
    }
})();