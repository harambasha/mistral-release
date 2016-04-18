import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Projects } from '../api/projects.js';

import './project.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('projects');
});

Template.body.helpers({
    projects() {
        return Projects.find({}, { sort: { createdAt: -1 } });
    }
});

Template.body.events({
    'submit .new-project'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const name = target.name.value;
        const description = target.description.value;

        // Insert a project into the collection
        Meteor.call('projects.insert', name, description);

        // Clear form
        target.name.value = '';
        target.description.value = '';
    }
});