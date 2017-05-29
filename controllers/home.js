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
const Goal = require('../models/Goal.js');

exports.getGoals = (req, res) => {
  Goal.find((err, docs) => {
    res.render('home', { goals: docs });
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
