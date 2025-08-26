import express from 'express';
import { PORT } from './config/env.js';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import subscriptionRouter from './routes/subscription.route.js';

const app = express();

// api/v1/auth/sign-up
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscription', subscriptionRouter)




app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API!');
})


app.listen(PORT, () => {
    console.log(`Subscripton Tracker API is running on http://localhost:${PORT}`)
});


export default app;