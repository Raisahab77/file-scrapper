import express from 'express';
import 'dotenv/config';
import './database/database'; 

const app = express();

const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});