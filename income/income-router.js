const router = require('express').Router();

const Income = require('./income-model');

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Income.findIncomeById(id)
        .then(income => {
            if (income) {
                res.status(200).json(income);
            } else {
                res.status(404).json({
                    message: "income by given id does not exist"
                })
            }
        })
        .catch(err => {
            console.log('Income.findIncomeById', err)
            res.status(500).json(err);
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Income.updateIncome(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json(updated)
            } else {
                res.status(404).json({
                    message: 'Could not find income with given id'
                })
            }
        })
        .catch(err => {
            console.log('Income.updateIncome', err)
            res.status(500).json({
                message: 'Faile to update income'
            })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Income.deleteIncome(id)
        .then(count => {
            if (count) {
                res.status(200).json({
                    removed: count
                })
            } else {
                res.status(404).json({
                    message: 'Could not find income by that id'
                })
            }
        })
        .catch(err => {
            console.log('Income.deleteIncome', err)
            res.status(500).json({
                message: 'Failed to delete income'
            })
        })
})

module.exports = router;