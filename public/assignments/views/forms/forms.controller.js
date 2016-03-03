/**
 * Created by Bhanu on 02/03/2016.
 */
"user strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController)

    function FormsController(FormService, $scope, $rootScope, $location) {

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
            var newUserForm = {
                "title": $scope.form.form_title,
            }
            FormService.createFormForUser($rootScope.user._id, newUserForm, callback);

            function callback(response) {
                //Updating the model with the newly added form.
                //updateFormToScope(response);
                //There is a totally wired thing happening, where while adding form, the new form gets
                //added to the scope automatically.
                getAllFormsForUser();
            };
        };
        function updateForm() {

            FormService.updateFormById();
            function callback() {

            };
        };
        function deleteForm(formId) {
            FormService.deleteFormById(formId, callback);
            function callback(response) {
                //Updating the model.
                updateFormToScope(response);

            };
        };
        function selectForm() {
            function callback(response) {
                //Updating the model.
                //updateFormToScope(response);
            };
        };
    };
})();