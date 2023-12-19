

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/edamam-recipes', async (req, res) => {
  try {
    const edamamApiKey = process.env.EDAMAM_API_KEY;

    // Read the ingredients query parameter from the request
    const ingredients = req.query.ingredients;

    // Use the ingredients parameter in the API URL
    const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&${ingredients}&app_id=31776401&app_key=${edamamApiKey}&diet=balanced&health=alcohol-free&cuisineType=American&mealType=Dinner&dishType=Main%20course&imageSize=REGULAR&random=true&field=ingredientLines`;

    const response = await axios.get(apiUrl);
    const recipes = response.data;

    res.json({ recipes });
  } catch (error) {
    console.error('Error fetching recipes from Edamam:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
