import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import userroutes from "./routes/users.js"; // Updated with .js extension
import categoryRoutes from './routes/categories.js';

const app = express();
app.use(express.json())
app.use(cors())
const PORT = 5000;

app.use("/api/mv/users", userroutes);
app.use("/api/mv/categories", categoryRoutes);


app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
