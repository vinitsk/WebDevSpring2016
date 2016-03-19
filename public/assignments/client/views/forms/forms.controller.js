/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController(FormService, $scope, $rootScope, $location) {

        $scope.$location = $location;
        $scope.form_id = "";

        //Setting the forms from the scope to populate UI
        getAllFormsForUser();

        //Event Handlers Decelerations
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        //Data Population Functions
        function getAllFormsForUser() {
            if (!$rootScope.user) {
                return;
            }
            FormService
                .findAllFormsForUser($rootScope.user._id)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    console.log(response);
                    $scope.forms = response.data;
                }
            }

            function error_callback(error) {
                console.log(error);
            }
        }

        function updateFormToScope(response) {
            if (Array.isArray(response)) {
                $scope.forms = response;
            } else {
                var scopeForms = $scope.forms;
                scopeForms.push(response);
                $scope.forms = scopeForms;
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
                    $scope.forms = response.data;
                    $scope.form_title = "";
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
            if (!$scope.form_id || $scope.form_id === "") {
                return;
            }
            var newUserForm = {
                "title": $scope.form_title,
                "userId": $rootScope.user._id
            };
            FormService
                .updateFormById($scope.form_id, newUserForm)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    $scope.form_title = "";
                    $scope.form_id = "";
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
                if (response != null) {
                    updateFormToScope(response.data);
                }
            }
            function error_callback(error) {
                console.log(error);
            }
        }
        function selectForm(formId, fromTitle) {
            $scope.form_id = formId;
            $scope.form_title = fromTitle;
        }
    }
})();