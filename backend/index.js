const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User')

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://root:root@cluster0.mrstoal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.post('/register', async (req, res) => {
    const {username, password} = req.body

    try {
        const newUser = await User.create({username, password})
        res.json({newUser})
    } catch (error) {
        res.status(404).json({message: 'Error creating user'})
    }
})

app.listen(4000)
// mongodb+srv://root:root@cluster0.mrstoal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

