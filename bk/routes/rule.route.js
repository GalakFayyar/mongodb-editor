const express = require('express');
const app = express();
const ruleRoute = express.Router();

// Response Profile model
let Rule = require('../models/rule');

ruleRoute.route('/create').post((req, res, next) => {
    console.log(req.body);
    req.body.forEach(rule => {
        console.log(rule);
        var query = { '_id': rule._id };
        Rule.findOneAndUpdate(query, rule, { upsert: true }, (error, data) => {
            if (error) {
                return next(error);
            }
        });
    });
    res.end();
});

// Get All
ruleRoute.route('/').get((req, res) => {
    Rule.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get single
ruleRoute.route('/read/:id').get((req, res) => {
    Rule.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Update
ruleRoute.route('/update/:id').put((req, res, next) => {
    Rule.findByIdAndUpdate(req.params.id, {
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
ruleRoute.route('/delete/:id').delete((req, res, next) => {
    Rule.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = ruleRoute;