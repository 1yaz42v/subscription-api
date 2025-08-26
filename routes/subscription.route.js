import { Router } from "express";

const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res) => {
    res.send({ title: 'GET all subscription'})
})


export default subscriptionRouter;