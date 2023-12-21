require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./components/Recipes');
const cors = require('cors');

const recipeRoutes = require('./Routes/RecipeRoutes');
const userRoutes = require('./Routes/UserRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URL);
// mongoose.connect('mongodb://localhost:27017/test');
console.log('check me out', process.env.MONGODB_URL);
app.use(cors());
app.use(express.json());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use your Edamam route
app.use('/api', recipeRoutes);
app.use('/api', userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
