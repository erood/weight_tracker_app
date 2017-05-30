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
const async = require('async');
const Goal = require('../models/Goal.js');
const Weight = require('../models/Weight.js');

exports.getGoals = (req, res, next) => {

  var locals = {};
  var tasks = [
      function(callback){
        Goal.find(function (err, docs) {
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
        Weight.find(function (err, docs1) {
          if (err) { return next(err); }
          if (docs1 != null){
            locals.weight = docs1;
            callback();
          }
          else{
            locals.weight = docs1;
            callback();
          }

        });
      },

  ];

  async.parallel(tasks, function(err) {
      if (err) return next(err);
      res.render('home', locals);
  });
};


/**
 * POST /
 * Update profile information.
 */
 exports.postGoals = (req, res, next) => {
     //req.assert('goal_weight', 'Please ensure employee type or role is correct').isNumber();
     //req.assert('email', 'Please enter a valid email address.').isEmail();

     const errors = req.validationErrors();

     if (errors) {
       req.flash('errors', errors);
       return res.redirect('/');
     }
     /* define what needs to be saved*/
     const goal = new Goal({
       name: req.user.name,
       email: req.user.email,
       enter_goals: req.body.enter_goals,
       goal_weight: req.body.goal_weight,
       start_weight: req.body.start_weight,
       goal_date: req.body.goal_date,
     });

     goal.save((err) => {
       /* this provides a block if the error is that hte email address is already associated with an employee*/
       if (err) {
         if (err.code === 11000) {
           req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
           return res.redirect('/');
         }
         return next(err);
       }
       console.log("SAVED!");
       req.flash('success', { msg: 'This has been saved!' });
       res.redirect('/');
 });
 };



 /**
  * POST /
  * Update profile information.
  */
  exports.postWeights = (req, res, next) => {
      //req.assert('goal_weight', 'Please ensure employee type or role is correct').isNumber();
      //req.assert('email', 'Please enter a valid email address.').isEmail();

      const errors = req.validationErrors();

      if (errors) {
        req.flash('errors', errors);
        return res.redirect('/');
      }
      /* define what needs to be saved*/
      const weight = new Weight({
        name: req.user.name,
        email: req.user.email,
        weight: req.body.enter_weight_actual,
        date: req.body.entry_date,
      });

      weight.save((err) => {
        /* this provides a block if the error is that hte email address is already associated with an employee*/
        if (err) {
          if (err.code === 11000) {
            req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
            return res.redirect('/');
          }
          return next(err);
        }
        console.log("SAVED!");
        req.flash('success', { msg: 'This has been saved!' });
        res.redirect('/');
  });
  };
