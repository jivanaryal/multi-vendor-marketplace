import dotenv from 'dotenv';
dotenv.config();
import express  from 'express';
import db from './database/connect.js';


const app = express();
const PORT = 5000;

app.get('/', async (_, res) => {
 try {
     const response = await db`select * from products`;
     console.log(response)
     res.json(response);
 } catch (error) {
     console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
 }
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});