/**
 * Created by Bhanu on 18/03/2016.
 */
module.exports = function (Form, q) {
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
        var deferred = q.defer();
        Form.create(mapDBForm(form), function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function getFormById(form) {
        var deferred = q.defer();
        Form.findOne(mapDBForm(form), function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllFormsForUser(form) {
        var deferred = q.defer();
        Form.find(mapDBForm(form), function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteFormById(form) {
        var deferred = q.defer();
        Form.remove(mapDBForm(form), function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(doc);
                deferred.resolve(doc);
                }
        });
        return deferred.promise;
    }

    function updateFormById(formId, form) {
        var deferred = q.defer();
        Form.findOneAndUpdate(
            {_id: formId},
            {$set: mapDBForm(form)},
            {new: true},
            function (err, doc) {
                if (err) {
                    console.log(err);
                    deferred.reject(err);
                } else {
                    console.log(doc);
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }


};