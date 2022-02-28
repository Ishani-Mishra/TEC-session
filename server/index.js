const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const PORT = 4000;

const app = express();
app.use(express.urlencoded({
    extends: true
}));
app.use(cors());
app.use(express.json());

connectDB();

app.use("/", async (req, res) => {
    res.write('<h1>Backend server running!</h1>')
    res.send();
})

app.listen(PORT, () => console.log(`App is listening at ${PORT}`));

