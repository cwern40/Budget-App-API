const router = require('express').Router();

const Budget = require('./budgets-model');

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Budget.findBudgetById(id)
        .then(budget => {
            if (budget) {
                Budget.findBudgetIncomes(budget.id)
                    .then(incomes => {
                        Budget.findBudgetExpenses(budget.id)
                            .then(expenses => {
                                res.status(200).json({
                                    budget,
                                    income: incomes,
                                    expenses: expenses
                                })
                            })
                    })
            } else {
                res.status(401).json({
                    message: "Error loading budget information"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

router.post('/', (req, res) => {
    const data = req.body;

    Budget.addBudget(data)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

router.post('/:id/income', (req, res) => {
    const { id } = req.params;
    const { income_name, income_amount} = req.body;
    const add = {income_name: income_name, income_amount: income_amount, budget_id: id};

    Budget.addIncome(add)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.post('/:id/expenses', (req, res) => {
    const { id } = req.params;
    const { expense_name, expense_amount } = req.body;
    const add = {expense_name:expense_name, expense_amount: expense_amount, budget_id: id};

    Budget.addExpense(add)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Budget.updateBudget(id, changes)
        .then(updated => {
            if (updateBudget) {
                res.status(200).json({
                    updated: updated
                })
            } else {
                res.status(404).json({
                    message: 'Could not find budget with that id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to update budget'
            })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Budget.deleteBudget(id)
        .then(count => {
            if (count) {
                res.status(200).json({
                    removed: count
                })
            } else {
                res.status(404).json({
                    message: 'Could not find budget by that id'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Failed to delete the bugdet'
            })
        })
})

module.exports = router;