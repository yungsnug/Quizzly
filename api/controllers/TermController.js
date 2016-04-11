/**
 * TermController
 *
 * @description :: Server-side logic for managing Terms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird');

module.exports = {
  multifind: function(req, res) {
    var data = req.params.all();
    Term.find(data.termIds).populate('season').populate('year')
    .exec(function(err, terms) {
      res.json(terms);
    });
  },
}
