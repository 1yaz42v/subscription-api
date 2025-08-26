import { Router } from "express";

const subscriptionRouter = Router();

// GET all subscriptions
subscriptionRouter.get('/', (req, res) => {
    res.send({ title: 'GET all subscriptions' });
});

// GET subscription details by ID
subscriptionRouter.get('/:id', (req, res) => {
    res.send({ title: 'GET subscription details', id: req.params.id });
});

// CREATE new subscription
subscriptionRouter.post('/', (req, res) => {
    res.send({ title: 'CREATE subscription' });
});

// UPDATE subscription by ID
subscriptionRouter.put('/:id', (req, res) => {
    res.send({ title: 'UPDATE subscription', id: req.params.id });
});

// DELETE subscription by ID
subscriptionRouter.delete('/:id', (req, res) => {
    res.send({ title: 'DELETE subscription', id: req.params.id });
});

// GET all subscriptions for a specific user
subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({ title: 'GET all user subscriptions', userId: req.params.id });
});

// CANCEL subscription by ID
subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({ title: 'CANCEL subscription', id: req.params.id });
});

// GET upcoming renewals
subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ title: 'GET upcoming renewals' });
});

export default subscriptionRouter;
