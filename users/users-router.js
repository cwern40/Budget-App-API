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

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            const token = generateToken(saved)
            res.status(201).json({saved, token})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
    let { email, password } = req.body;

    Users.findBy({ email })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                delete user.password
                Users.findUserBudgets(user.id)
                    .then(budgets => {
                        res.status(200).json({
                            user,
                            budgets: budgets,
                            token
                        })
                    })
            } else {
                res.status(401).json({
                    message: 'Incorrect username or password'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router;