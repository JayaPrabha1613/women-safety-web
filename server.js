const { name } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json()); // For JSON data
app.use(express.static(__dirname))
mongoose.connect('mongodb://localhost:27017/index');
const db = mongoose.connection;

db.once('open', () => {
    console.log("connected");
});

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    phoneCount: Number,
    email: String,
    password: String,
    confirmPassword: String
});

const Users = mongoose.model("data", userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
    // Extract data from request body
    const { name, age, phoneCount, email, password, confirmPassword } = req.body;

    // Create a new user document
    const user = new Users({
        name,
        age,
        phoneCount,
        email,
        password,
        confirmPassword
    });

    // Save the user to the database
    await user.save();

    console.log(user);
    res.send("Form submitted");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

