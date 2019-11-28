const express = require('express');
const app = express();
const converterRoute = express.Router();

// Response Profile model
let Converter = require('../models/converter');

converterRoute.route('/create').post((req, res, next) => {
    req.body.forEach(rp => {
        console.log(rp);
        var query = { '_id': rp._id };
        Converter.findOneAndUpdate(query, rp, { upsert: true }, (error, data) => {
            if (error) {
                return next(error);
            }
        });
    });
    res.end();
});

// Get All
converterRoute.route('/').get((req, res) => {
    Converter.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

// Get single
converterRoute.route('/read/:id').get((req, res) => {
    Converter.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

// Update
converterRoute.route('/update/:id').put((req, res, next) => {
    Converter.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Data updated successfully');
        }
    })
});

// Delete
converterRoute.route('/delete/:id').delete((req, res, next) => {
    Converter.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = converterRoute;