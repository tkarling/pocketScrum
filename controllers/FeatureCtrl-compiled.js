'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var BaseCtrl = (function () {
    function BaseCtrl() {
        _classCallCheck(this, BaseCtrl);
    }

    _createClass(BaseCtrl, [{
        key: 'create',
        value: function create(req, res) {
            var newFeature = new Feature(req.body);
            newFeature.save(function (err, result) {
                if (err) return res.status(500).send(err);else res.send(result);
            });
        }
    }, {
        key: 'read',
        value: function read(req, res) {
            this.model.find(req.query).exec(function (err, result) {
                if (err) return res.status(500).send(err);else res.send(result);
            });
        }
    }, {
        key: 'update',
        value: function update(req, res) {
            var id = req.query.id;
            var updatedObject = req.body;
            this.model.findByIdAndUpdate(id, updatedObject, {
                'new': true
            }, function (err, result) {
                if (err) return res.status(500).send(err);else {
                    res.send(result);
                }
            });
        }
    }, {
        key: 'delete',
        value: function _delete(req, res) {
            var id = req.query.id;
            this.model.findByIdAndRemove(id, function (err, result) {
                if (err) return res.status(500).send(err);else res.send(result);
            });
        }
    }]);

    return BaseCtrl;
})();

var Status = require('../models/Status');

var StatusCtrl = (function (_BaseCtrl) {
    _inherits(StatusCtrl, _BaseCtrl);

    function StatusCtrl() {
        _classCallCheck(this, StatusCtrl);

        _get(Object.getPrototypeOf(StatusCtrl.prototype), 'constructor', this).call(this);
        this.model = Status;
    }

    return StatusCtrl;
})(BaseCtrl);

exports.StatusCtrl = StatusCtrl;

var Feature = require('../models/Feature');
//import { Feature } from '../models/Feature';

var FeatureCtrl = (function (_BaseCtrl2) {
    _inherits(FeatureCtrl, _BaseCtrl2);

    function FeatureCtrl() {
        _classCallCheck(this, FeatureCtrl);

        _get(Object.getPrototypeOf(FeatureCtrl.prototype), 'constructor', this).call(this);
        this.model = Feature;
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

    _createClass(FeatureCtrl, [{
        key: 'read',
        value: function read(req, res) {
            this.model.find(req.query).populate("status").exec(function (err, result) {
                if (err) return res.status(500).send(err);else res.send(result);
            });
        }
    }]);

    return FeatureCtrl;
})(BaseCtrl);

exports.FeatureCtrl = FeatureCtrl;

//# sourceMappingURL=FeatureCtrl-compiled.js.map