/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var bcrypt = require('bcrypt');

module.exports = {
    /// API ///
    login: function(req, res) {
        var email = req.param('email');
        var password = req.param('password');

        User.findOne({
            email: email
        }).exec(function(err, found) {
            if (err) {
                res.set('error', 'please register first');
                res.send({
                    error: "please register first"
                });
                console.log(err);
            } else if (found) {
                if (bcrypt.compareSync(password, found.password)) {
                    req.session.user = found;
                    res.locals.loggedin = true;
                    console.log(found);
                    // TODO: redirect to the original url    
                    res.redirect('/')

                };
            } else {
                res.set('error', 'password not correct')
                // TODO: redirect to the original url    
                res.redirect('/login')
            };
        })


    },
    logout: function(req, res) {
        req.session.user = undefined;
        req.session.authenticated = false;
        res.redirect('/')
    },
    signup: function(req, res) {
        var email = req.param('email');
        var password = req.param('password');

        User.findOne({
            email: email
        }).exec(function findOneCB(err, found) {
            if (err) {
                // We set an error header here,
                // which we access in the views an display in the alert call.
                res.set('error', 'DB Error');
                // The error object sent below is converted to JSON
                res.send(500, {
                    error: "DB Error"
                });
                
            } else if (found) {
                res.set('error', 'Username already Taken');
                res.send(400, {
                    error: "Username already Taken"
                });
            } else {
                bcrypt.hash(password, 8, function(err, hash) {
                    User.create({
                        email: email,
                        password: hash
                    }).exec(function createCB(err, created) {
                        if (err) {
                            res.set('error', 'an error happened while creating a user, please try again');
                            console.log(err);
                            res.send(err)
                        } else {
                            req.session.user = created;
                            req.session.authenticated = true;
                            console.log('user created');

                            res.redirect('/')

                        }
                    });
                });

            }


        });

    },
    upload: function(req, res) {
        req.file('avatar').upload({
              dirname: require('path').resolve(sails.config.appPath, 'assets/images')
        },function(err, files) {
            if (err)
                return res.serverError(err);

            return res.json({
                message: files.length + ' file(s) uploaded successfully!',
                files: files,
                url: files[0].fd.substr(files[0].fd.lastIndexOf('/')+1)
            });
        });
    }


};