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
        key: 'basicResponse',
        value: function basicResponse(err, result, res) {
            if (err) return res.status(500).send(err);else res.send(result);
        }
    }, {
        key: 'create',
        value: function create(req, res, newItem) {
            var _this = this;

            newItem.save(function (err, result) {
                _this.basicResponse(err, result, res);
            });
        }
    }, {
        key: 'read',
        value: function read(req, res) {
            var _this2 = this;

            this.model.find(req.query).exec(function (err, result) {
                _this2.basicResponse(err, result, res);
            });
        }
    }, {
        key: 'update',
        value: function update(req, res) {
            var _this3 = this;

            var id = req.query.id;
            var updatedObject = req.body;
            this.model.findByIdAndUpdate(id, updatedObject, {
                'new': true
            }, function (err, result) {
                _this3.basicResponse(err, result, res);
            });
        }
    }, {
        key: 'delete',
        value: function _delete(req, res) {
            var _this4 = this;

            var id = req.query.id;
            this.model.findByIdAndRemove(id, function (err, result) {
                _this4.basicResponse(err, result, res);
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

    _createClass(StatusCtrl, [{
        key: 'create',
        value: function create(req, res) {
            _get(Object.getPrototypeOf(StatusCtrl.prototype), 'create', this).call(this, req, res, new Status(req.body));
        }
    }]);

    return StatusCtrl;
})(BaseCtrl);

exports.StatusCtrl = StatusCtrl;

var TeamMember = require('../models/TeamMember');

var TeamMemberCtrl = (function (_BaseCtrl2) {
    _inherits(TeamMemberCtrl, _BaseCtrl2);

    function TeamMemberCtrl() {
        _classCallCheck(this, TeamMemberCtrl);

        _get(Object.getPrototypeOf(TeamMemberCtrl.prototype), 'constructor', this).call(this);
        this.model = TeamMember;
    }

    _createClass(TeamMemberCtrl, [{
        key: 'create',
        value: function create(req, res) {
            _get(Object.getPrototypeOf(TeamMemberCtrl.prototype), 'create', this).call(this, req, res, new TeamMember(req.body));
        }
    }]);

    return TeamMemberCtrl;
})(BaseCtrl);

exports.TeamMemberCtrl = TeamMemberCtrl;

var UserStory = require('../models/UserStory');

var UserStoryCtrl = (function (_BaseCtrl3) {
    _inherits(UserStoryCtrl, _BaseCtrl3);

    function UserStoryCtrl() {
        _classCallCheck(this, UserStoryCtrl);

        _get(Object.getPrototypeOf(UserStoryCtrl.prototype), 'constructor', this).call(this);
        this.model = UserStory;
    }

    _createClass(UserStoryCtrl, [{
        key: 'create',
        value: function create(req, res) {
            _get(Object.getPrototypeOf(UserStoryCtrl.prototype), 'create', this).call(this, req, res, new UserStory(req.body));
        }
    }, {
        key: 'read',
        value: function read(req, res) {
            var _this5 = this;

            this.model.find(req.query).populate("feature").populate("status").populate("assignedTo").exec(function (err, result) {
                _this5.basicResponse(err, result, res);
            });
        }
    }]);

    return UserStoryCtrl;
})(BaseCtrl);

exports.UserStoryCtrl = UserStoryCtrl;

var Feature = require('../models/Feature');
//import { Feature } from '../models/Feature';

var FeatureCtrl = (function (_BaseCtrl4) {
    _inherits(FeatureCtrl, _BaseCtrl4);

    function FeatureCtrl() {
        _classCallCheck(this, FeatureCtrl);

        _get(Object.getPrototypeOf(FeatureCtrl.prototype), 'constructor', this).call(this);
        this.model = Feature;
    }

    _createClass(FeatureCtrl, [{
        key: 'create',
        value: function create(req, res) {
            _get(Object.getPrototypeOf(FeatureCtrl.prototype), 'create', this).call(this, req, res, new Feature(req.body));
        }
    }, {
        key: 'read',
        value: function read(req, res) {
            var _this6 = this;

            this.model.find(req.query).populate("status").exec(function (err, result) {
                _this6.basicResponse(err, result, res);
            });
        }
    }]);

    return FeatureCtrl;
})(BaseCtrl);

exports.FeatureCtrl = FeatureCtrl;

var Project = require('../models/Project');

var ProjectCtrl = (function (_BaseCtrl5) {
    _inherits(ProjectCtrl, _BaseCtrl5);

    function ProjectCtrl() {
        _classCallCheck(this, ProjectCtrl);

        _get(Object.getPrototypeOf(ProjectCtrl.prototype), 'constructor', this).call(this);
        this.model = Project;
    }

    _createClass(ProjectCtrl, [{
        key: 'create',
        value: function create(req, res) {
            _get(Object.getPrototypeOf(ProjectCtrl.prototype), 'create', this).call(this, req, res, new Project(req.body));
        }
    }]);

    return ProjectCtrl;
})(BaseCtrl);

exports.ProjectCtrl = ProjectCtrl;

//# sourceMappingURL=BaseCtrl-compiled.js.map