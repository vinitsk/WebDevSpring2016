/**
 * Created by Bhanu on 18/03/2016.
 */
module.exports = function (Form) {
    var api = {
        createFormForUser: createFormForUser,
        getFormById: getFormById,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
    };
    return api;

    function mapDBForm(form) {
        var new_form = {};
        if ('_id' in form) {
            new_form['_id'] = form._id
        }
        if ('title' in form) {
            new_form['title'] = form.title
        }
        if ('userId' in form) {
            new_form['userId'] = form.userId
        }
        if ('fields' in form) {
            new_form['fields'] = form.fields
        }
        return new_form
    }

    function createFormForUser(form) {
        return Form.create(mapDBForm(form));
    }

    function getFormById(formId) {
        return Form.findById(formId);
    }

    function findAllFormsForUser(userId) {
        var form = {'userId': userId};
        return Form.find(form);
    }

    function deleteFormById(formId) {
        return Form.findByIdAndRemove(formId);
    }

    function updateFormById(formId, form) {
        return Form.findOneAndUpdate(
            {_id: formId},
            {$set: mapDBForm(form)},
            {new: true});
    }


};