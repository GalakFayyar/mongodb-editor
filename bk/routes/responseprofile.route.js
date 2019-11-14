const express = require('express');
const app = express();
const responseProfileRoute = express.Router();

// Response Profile model
let ResponseProfile = require('../models/responseprofile');

responseProfileRoute.route('/create').post((req, res, next) => {
    var result = [];
    req.body.forEach(rp => {
        console.log(rp);
        var query = { '_id': rp._id };
        ResponseProfile.findOneAndUpdate(query, rp, { upsert: true }, (error, data) => {
            if (error) {
                return next(error);
            } else {
                result.push(data);
            }
        });
    });
    res.json(result);
    res.end();
});

// Get All Response Profiles
responseProfileRoute.route('/').get((req, res) => {
    ResponseProfile.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get single Response Profile
responseProfileRoute.route('/read/:id').get((req, res) => {
    ResponseProfile.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Update Response Profile
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
});

// Delete Response Profile
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
});

module.exports = responseProfileRoute;