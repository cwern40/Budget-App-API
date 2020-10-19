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

module.exports = router;