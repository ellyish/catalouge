/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'index': function(req, res) {
        Type.find().exec(function(err, types) {
            if (err) {
                return res.negotiate(err);
            }

            console.log(types);
            res.view('homepage', {
                types: types,
                loggedin: req.session.user
            })

        })
    },
    'showSpecificMerchant': function(req, res) {
        Merchant.find({
            type: req.params.id
        }).exec(function(err, merchants) {
            res.view('merchant', {
                merchants: merchants,
                loggedin: req.session.user
            })
        })
    },
    'deleteSpecificMerchant': function(req, res) {
        if (req.session.user) {
            Merchant.destroy({
                id: parseInt(req.params.id)
            }).exec(function(err, merchants) {
                if (err) {
                    res.send('err happened')
                }
                res.redirect(req.get('referer'));
            })
        } else {
            res.send('not allowed operation')
        }

    },

};