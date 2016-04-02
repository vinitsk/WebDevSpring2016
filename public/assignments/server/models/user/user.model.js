/**
 * Created by Bhanu on 18/03/2016.
 */
module.exports = function (User, q) {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByUsername(username) {
        var user = {'username': username};
        return User.findOne(user);
    }

    function findUserByCredentials(username, password) {
        var user = {
            'username': username,
            'password': password
        };
        return User.findOne(user);
    }

    function findAllUsers() {
        return User.find({});
    }

    function createUser(user) {
        return User.create(mapDBUser(user));
    }

    function mapDBUser(user) {
        var new_user = {};
        if ('_id' in user) {
            new_user['_id'] = user._id;
        }
        if ('username' in user) {
            new_user['username'] = user.username;
        }
        if ('password' in user) {
            new_user['password'] = user.password;
        }
        if ('email' in user) {
            new_user['email'] = user.email;
        }
        if ('firstName' in user) {
            new_user['firstName'] = user.firstName;
        }
        if ('lastName' in user) {
            new_user['lastName'] = user.lastName;
        }
        if ('roles' in user) {
            new_user['roles'] = user.roles;
        }
        return new_user;
    }

    function deleteUserById(userdId) {
        return User.findByIdAndRemove(userId);
    }

    function updateUser(userID, user) {
        return User.findOneAndUpdate(
            {_id: userID},
            {$set: mapDBUser(user)},
            {new: true});
    }

};

