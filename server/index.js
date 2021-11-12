const express = require('express');
const mongoose = require('mongoose');
const FoodModel = require('./models/Food');

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://ananya:ananya@cluster0.coysa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: 'true',
});

app.get('/', async (req, res) => {
    const food = new FoodModel({ foodName: 'Apple', daysSinceIAte: 5 });

    try {
        await food.save();
        res.send('Inserted data');
    }
    catch (err) {
        console.log(err);
    }
});

app.listen('3001', () => {
    console.log('Server running on port 3001...');
});