const express = require('express');
const app = express();
const responseProfileRoute = express.Router();

// Employee model
let ResponseProfile = require('../models/responseprofile');

// Add Employee
responseProfileRoute.route('/create').post((req, res, next) => {
  ResponseProfile.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Employees
responseProfileRoute.route('/').get((req, res) => {
  ResponseProfile.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
responseProfileRoute.route('/read/:id').get((req, res) => {
  ResponseProfile.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update employee
responseProfileRoute.route('/update/:id').put((req, res, next) => {
  ResponseProfile.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete employee
responseProfileRoute.route('/delete/:id').delete((req, res, next) => {
  ResponseProfile.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = responseProfileRoute;