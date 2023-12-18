const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const recipeRoutes = require('./components/Routes/RecipeRoutes');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URL;

app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(express.json());

// Define your routes here
// For example:
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.get(recipeFetch);

async function recipeFetch (req, res)  {
    try {
      const { ingredients, allergies } = req.query;
  
      // Replace YOUR_EDAMAM_APP_ID and YOUR_EDAMAM_APP_KEY with your actual credentials
      const edamamAppId = '31776401';
      const edamamAppKey = '3148d04f672974e3b528a338df4b1143';
  
      const apiUrl = `https://api.edamam.com/search?q=${encodeURIComponent(
        ingredients
      )}&app_id=${edamamAppId}&app_key=${edamamAppKey}&from=0&to=10`;
     
      // Add logic to filter by allergies if needed
      if (allergies) {
        apiUrl += `&health=${encodeURIComponent(allergies)}`;
      }
  
      const response = await axios.get(apiUrl);
      const recipes = response.data.hits.map(hit => hit.recipe);
  
      res.json({ recipes });
    } catch (error) {
      console.error('Error fetching recipes from Edamam:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

