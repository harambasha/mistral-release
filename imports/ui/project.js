import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './project.html';

Template.project.helpers({
    isOwner() {
        return this.owner === Meteor.userId();
    }
});

Template.project.events({
    'click .delete'() {
        Meteor.call('projects.remove', this._id);
    }
});