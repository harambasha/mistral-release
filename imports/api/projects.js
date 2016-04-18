import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('projects', function projectsPublication() {
        return Projects.find({
            $or: [
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'projects.insert'(name, description) {
        check(name, String);
        check(description, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Projects.insert({
            name,
            description,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'projects.remove'(projectId) {
        check(projectId, String);

        const project = Projects.findOne(projectId);
        if (project.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Projects.remove(projectId);
    },
});