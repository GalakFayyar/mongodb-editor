const express = require('express');
const app = express();
const responseProfileRoute = express.Router();

// Response Profile model
let ResponseProfile = require('../models/responseprofile');

responseProfileRoute.route('/create').post((req, res, next) => {
    req.body.forEach(rp => {
        console.log(rp);
        var query = { '_id': rp._id };
        ResponseProfile.findOneAndUpdate(query, rp, { upsert: true }, (error, data) => {
            if (error) {
                return next(error);
            }
        });
    });
    res.end();
});

// Get All
responseProfileRoute.route('/').get((req, res) => {
    ResponseProfile.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get single
responseProfileRoute.route('/read/:id').get((req, res) => {
    ResponseProfile.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Update
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

// Delete
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