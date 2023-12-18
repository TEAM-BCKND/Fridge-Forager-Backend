// routes/recipeRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/edamam-recipes', async (req, res) => {
  try {
    // You can customize the URL with query parameters as needed
    const apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=31776401&app_key=3148d04f672974e3b528a338df4b1143&diet=balanced&health=kosher&cuisineType=American&mealType=Dinner&dishType=Bread&imageSize=REGULAR&random=true&field=ingredientLines';

    const response = await axios.get(apiUrl);
    const recipes = response.data; // Assuming the response contains recipe data

    res.json({ recipes });
  } catch (error) {
    console.error('Error fetching recipes from Edamam:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
