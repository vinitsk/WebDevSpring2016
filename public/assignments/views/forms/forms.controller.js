/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController)

    function FormsController(FormService, $scope, $rootScope, $location) {

        $scope.$location = $location;

        //Setting the forms from the scope to populate UI
        getAllFormsForUser();

        //Event Handlers Decelerations
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        //Data Population Functions
        function getAllFormsForUser() {
            var forms = [];
            if ($rootScope.user) {
                FormService.findAllFormsForUser($rootScope.user._id, callback);
            }
            function callback(response) {
                $scope.forms = response;
            };
        };

        function updateFormToScope(response) {
            if (Array.isArray(response)) {
                $scope.forms = response;
            } else {
                var scopeForms = $scope.forms;
                scopeForms.push(response);
                $scope.forms = scopeForms;
            }
        };

        //Event Handlers Implementations
        function addForm() {
            if (!$scope.form_title || $scope.form_title === "") {
                return;
            }
            var newUserForm = {
                "title": $scope.form_title,
            }
            FormService.createFormForUser($rootScope.user._id, newUserForm, callback);
            function callback(response) {
                $scope.form_title="";
                $scope.form_id="";
                //Updating the model with the newly added form.
                //updateFormToScope(response);
                //There is a totally wired thing happening, where while adding form, the new form gets
                //added to the scope automatically.
                getAllFormsForUser();
            };
        };
        function updateForm() {

            if(!$scope.form_id || $scope.form_id ===""){
                return;
            }
            var newUserForm = {
                "title": $scope.form_title,
                "userId":$rootScope.user._id
            }
            FormService.updateFormById($scope.form_id,newUserForm ,callback);
            function callback(response) {
                $scope.form_title="";
                $scope.form_id="";
                getAllFormsForUser();
            };
        };
        function deleteForm(formId) {
            FormService.deleteFormById(formId, callback);
            function callback(response) {
                //Updating the model.
                updateFormToScope(response);
            };
        };
        function selectForm(formId,formName) {
            $scope.form_title=formName;
            $scope.form_id=formId;
        };
    };
})();