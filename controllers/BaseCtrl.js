
class BaseCtrl {
    constructor (){
    }

    basicResponse (err, result, res) {
        if (err) return res.status(500).send(err);
        else res.send(result);
    }

    create(req, res, newItem) {
        newItem.save((err, result)=> {
            this.basicResponse(err, result, res);
        });
    }
    read(req, res) {
        this.model.find(req.query)
            .exec((err, result)=> {
                this.basicResponse(err, result, res);
            });
    }

    update(req, res) {
        var id = req.query.id;
        var updatedObject = req.body;
        this.model.findByIdAndUpdate(id, updatedObject, {
            new: true
        }, (err, result)=> {
            this.basicResponse(err, result, res);
        });
    }

    delete(req, res) {
        var id = req.query.id;
        this.model.findByIdAndRemove(id, (err, result)=> {
            this.basicResponse(err, result, res);
        });
    }
}

let Status = require('../models/Status');
export class StatusCtrl extends BaseCtrl {
    constructor() {
        super();
        this.model = Status;
    }

    create(req, res) {
        super.create(req, res, new Status(req.body));
    }
}

let TeamMember = require('../models/TeamMember');
export class TeamMemberCtrl extends BaseCtrl {
    constructor() {
        super();
        this.model = TeamMember;
    }

    create(req, res) {
        super.create(req, res, new TeamMember(req.body));
    }
}

let UserStory = require('../models/UserStory');
export class UserStoryCtrl extends BaseCtrl {
    constructor() {
        super();
        this.model = UserStory;
    }

    create(req, res) {
        super.create(req, res, new UserStory(req.body));
    }

    read(req, res) {
        this.model.find(req.query)
            .populate("feature")
            .populate("status")
            .populate("assignedTo")
            .exec((err, result)=> {
                this.basicResponse(err, result, res);
            });
    }
}

let Feature = require('../models/Feature');
//import { Feature } from '../models/Feature';
export class FeatureCtrl extends BaseCtrl {
    constructor() {
        super();
        this.model = Feature;
    }

    create(req, res) {
        super.create(req, res, new Feature(req.body));
    }

    read(req, res) {
        this.model.find(req.query)
            .populate("status")
            .exec((err, result)=> {
                this.basicResponse(err, result, res);
            });
    }
}

let Project = require('../models/Project');
export class ProjectCtrl extends BaseCtrl {
    constructor() {
        super();
        this.model = Project;
    }

    create(req, res) {
        super.create(req, res, new Project(req.body));
    }
}
