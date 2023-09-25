import express, { json } from 'express';
import 'dotenv/config';
import './config/db/connection.js'
import userRouter from './routes/users.js';
import productsRouter from './routes/products.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(cors())

app.use('/users', userRouter);
app.use('/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});