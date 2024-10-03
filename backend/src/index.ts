import express, { Request, Response } from 'express';

const app = express();
const port = 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
