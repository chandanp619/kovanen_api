var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('API is Working');
});

router.post('/login', function(req, res, next) {


    var email = (req.body.email)?req.body.email:'';
    var passwd = (req.body.password)?req.body.password:'';

    console.log(req);



    var userModel = require('../models/users');

    if(email!=='' && passwd!=='') {

        userModel.findOne({"email": email, "password": passwd}, function (err, data) {
            if (err) {
                res.json({"error": "Error:" + err.toString()});
            }
            if (data == null) {
                res.json({"error": "User Not Found"});
            } else {
                if (data.email == email) {
                    res.json({"success": "User Found"});
                }
            }
        })
    }else{
        res.json({"error": "Email or Password Blank"});
    } // end if
});


router.get('/cars', function(req, res, next) {

    var carsModel = require('../models/cars');
        carsModel.find({}, function (err, data) {
            if (err) {
                res.json({"error": err.toString()});
            }
            if (data == null) {
                res.json({"error": "Cars Not Found"});
            } else {
                    res.json(data);
            }
        })

});

router.get('/car/:id', function(req, res, next) {
    var CarID = req.params.id;
    var carsModel = require('../models/cars');
    carsModel.findOne({"_id":mongoose.Types.ObjectId(CarID)}, function (err, data) {
        if (err) {
            res.json({"error": err.toString()});
        }
        if (data == null) {
            res.json({"error": "Cars Not Found"});
        } else {
            res.json(data);
        }
    })

});

router.post('/car/update/:id', function(req, res, next) {

    var CarID = req.params.id;
    console.log(req.body);
    var NewData = {
        "reg_number":req.body.reg_number,
        "make":req.body.make,
        "model":req.body.model,
        "year":req.body.year,
        "auto":req.body.auto,
        "power_window":req.body.power_window,
        "owner":req.body.owner,
        "status":req.body.status,
    };

    var carsModel = require('../models/cars');
    carsModel.updateOne({"_id":mongoose.Types.ObjectId(CarID)}, NewData , function (err, data) {
        if (err) {
            res.json({"error": err.toString()});
        }
        if (data == null) {
            res.json({"error": "Cars Not Updated"});
        } else {
            console.log(data);
            res.json({"status":"Car Updated"});
        }
    })

});

router.post('/car/add', function(req, res, next) {

    var CarID = req.params.id;
    console.log(req.body);
    var NewData = {
        "reg_number":req.body.reg_number,
        "make":req.body.make,
        "model":req.body.model,
        "year":req.body.year,
        "auto":req.body.auto,
        "power_window":req.body.power_window,
        "owner":req.body.owner,
        "status":req.body.status
    };

    var carsModel = require('../models/cars');
    carsModel.create( NewData , function (err, data) {
        if (err) {
            res.json({"error": err.toString()});
        }
        if (data == null) {
            res.json({"error": "Cars Not Added"});
        } else {
            console.log(data);
            res.json({"status":"Car Added"});
        }
    })

});

router.get('/make', function(req, res, next) {
    var makemodelModel = require('../models/makemodel');
    makemodelModel.find().distinct("make", function (err, data) {
        if (err) {
            res.json({"error": err.toString()});
        }
        if (data == null) {
            res.json({"error": "Make Models Not Found"});
        } else {
            res.json(data);
        }
    })

});

router.get('/model', function(req, res, next) {
    var makemodelModel = require('../models/makemodel');
    makemodelModel.find({}, function (err, data) {
        if (err) {
            res.json({"error": err.toString()});
        }
        if (data == null) {
            res.json({"error": "Make Models Not Found"});
        } else {
            res.json(data);
        }
    })

});

router.get('/model/:make', function(req, res, next) {
    var makeStr = req.params.make;
    var makemodelModel = require('../models/makemodel');
    makemodelModel.find({"make":makeStr}, function (err, data) {
        if (err) {
            res.json({"error": err.toString()});
        }
        if (data == null) {
            res.json({"error": "Make Models Not Found"});
        } else {
            res.json(data);
        }
    })

});

module.exports = router;
