const router = require('express').Router();

const Expenses = require('./expenses-model');

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Expenses.findExpenseById(id)
        .then(expense => {
            if (expense) {
                res.status(200).json(expense);
            } else {
                res.status(404).json({
                    message: 'expense by given id does not exist'
                })
            }
        })
        .catch(err => {
            console.log('Expenses.findExpenseById', err);
            res.status(500).json(err)
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Expenses.updateExpense(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json(updated)
            } else {
                res.status(404).json({
                    message: 'could not find expense with given id'
                })
            }
        })
        .catch(err => {
            console.log('Expenses.updateExpense', err)
            res.status(500).json(err)
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Expenses.deleteExpence(id)
        .then(count => {
            if (count) {
                res.status(200).json({
                    removed: count
                })
            } else {
                res.status(404).json({
                    message: 'Could not find expense by that id'
                })
            }
        })
        .catch(err => {
            console.log('Expenses.deleteExpence', err);
            res.status(500).json({
                message: 'Failed to delete income'
            })
        })
})

module.exports = router;