/**
 * Created by Bhanu on 18/03/2016.
 */

"use strict";
module.exports=function(app,userModel){

    app.get("/api/assignment/user",findAllUsers);

    function findAllUsers(req,res){
        userModel
            .findAllUsers()
            .then(success_callback)
            .fail(error_callback)

        function success_callback(response){
            res.json(response);
        }
        function error_callback(error){
            res.status(400).send(error);
        }
    }
}