const router = require('express').Router();
const bcrypt = require('bcrypt');
const generateToken = require('./generateToken');

const Users = require('./users-model');

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Users.findById(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({
                    message: 'Could not find user with given id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get user',
                error: err
            })
        })
})