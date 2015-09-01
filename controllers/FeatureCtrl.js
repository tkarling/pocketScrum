
class BaseCtrl {
    constructor (){
    }

    create(req, res) {
        var newFeature = new Feature(req.body);
        newFeature.save(function (err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    }

    read(req, res) {
        this.model.find(req.query)
            .exec(function (err, result) {
                if (err) return res.status(500).send(err);
                else res.send(result);
            });
    }

    update(req, res) {
        var id = req.query.id;
        var updatedObject = req.body;
        this.model.findByIdAndUpdate(id, updatedObject, {
            new: true
        }, function (err, result) {
            if (err) return res.status(500).send(err);
            else {
                res.send(result);
            }
        });
    }

    delete(req, res) {
        var id = req.query.id;
        this.model.findByIdAndRemove(id, function (err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    }
}

let Status = require('../models/Status');
export class StatusCtrl extends BaseCtrl {
    constructor() {
        super();
        this.model = Status;
    }
}

let Feature = require('../models/Feature');
//import { Feature } from '../models/Feature';
export class FeatureCtrl extends BaseCtrl {
    constructor() {
        super();
        this.model = Feature;
    }

    read(req, res) {
        this.model.find(req.query)
            .populate("status")
            .exec(function (err, result) {
                if (err) return res.status(500).send(err);
                else res.send(result);
            });
    }
}



//export var featureCtrl = new FeatureCtrl();


//module.exports = {
//
//    create: function (req, res) {
//        var newFeature = new Feature(req.body);
//        newFeature.save(function (err, result) {
//            if (err) return res.status(500).send(err);
//            else res.send(result);
//        });
//    },
//
//    read: function (req, res) {
//        Feature.find(req.query)
//            .populate("status")
//            .exec(function (err, result) {
//                if (err) return res.status(500).send(err);
//                else res.send(result);
//            });
//    },
//
//    update: function (req, res) {
//        var id = req.query.id;
//        var updatedObject = req.body;
//        Feature.findByIdAndUpdate(id, updatedObject, {
//            new: true
//        }, function (err, result) {
//            if (err) return res.status(500).send(err);
//            else {
//                res.send(result);
//            }
//        });
//    },
//
//    delete: function (req, res) {
//        var id = req.query.id;
//        Feature.findByIdAndRemove(id, function (err, result) {
//            if (err) return res.status(500).send(derr);
//            else res.send(result);
//        });
//    }
//};
