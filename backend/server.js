import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userroutes from "./routes/users.js"; // Updated with .js extension

const app = express();
const PORT = 5000;

app.use("/api", userroutes);
app.use("/", (req, res) => {
    res.send("hello jivan")
})

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
