'use strict';

const db = require('./connection');
const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().alphanum().required(),
    subject: Joi.string().required(),
    message: Joi.string().max(500).required(),
    imageURL: Joi.string().uri({
        scheme: [
            /https?/
        ]
    })
})

const messages = db.get('messages');

function getAll() {
    return messages.find();
}

async function create(message) {
    try {
        if(!message.username) message.username = 'Anonymous';
        await schema.validateAsync(message, {
            abortEarly: false
        });
        message.created = new Date();
        return messages.insert(message);
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = {
    getAll,
    create
};