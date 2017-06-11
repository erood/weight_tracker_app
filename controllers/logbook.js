/**
 * GET /
 * Home page.
 */
/*exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};*/


/**
 * GET /
 * List all goals.
 */


 /**
  * GET /logbooks
  * List all logbooks.
  */
  /**
   * GET /
   * List all goals.
   */
  const async = require('async');
  const Goal = require('../models/Goal.js');
  const Weight = require('../models/Weight.js');

  exports.getLogbooks = (req, res, next) => {

    var locals = {};
    var tasks = [
        function(callback){
          Goal.find({ 'email': req.user.email }, function (err, docs) {
            if (err) { return callback(err); }
            if (docs != null){
              locals.goal = docs;
              callback();
            }
            else{
              locals.goal = docs;
              callback();
            }
          });
        },

        function(callback){
          //used to sort weight by the log date (needed because a user can back date a weight entry making chart/log out of order)
          Weight.find({ 'email': req.user.email }, function (err, docs1) {
            if (err) { return next(err); }
            if (docs1 != null){
              locals.weight = docs1;
              callback();
            }
            else{
              locals.weight = docs1;
              callback();
            }

          }).sort({"date":-1});
        },

    ];

    async.parallel(tasks, function(err) {
        if (err) return next(err);
        res.render('logbooks', locals);
    });
  };


  /*
  ------- [Deleting] Updated employee information
  */

  exports.postDeleteWeight = (req, res, next) => {

    Weight.remove({$and:[
      { weight: req.body.weight},
      { date: req.body.date},
      ]}, (err) =>
        {
          if (err) { return next(err); }
          console.log("weight record deleted");
          console.log(req.body.weight),
          console.log(req.body.date)

        }
      );
  };
