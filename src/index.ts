import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import './database/database'; 
import route from './routes/v1';

const app = express();

const PORT = process.env.PORT;

app.use('/api/v1',route);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});