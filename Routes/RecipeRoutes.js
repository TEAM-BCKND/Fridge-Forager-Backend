

const express = require('express');
const axios = require('axios');
const router = express.Router();



router.get('/edamam-recipes', async (req, res) => {
  try {
    const edamamApiKey = process.env.EDAMAM_API_KEY;
    const edamamApiId = process.env.EDAMAM_API_ID;
    // Read the ingredients query parameter from the request
    const ingredients = req.query.ingredients;
    console.log('Ingredients:', ingredients);

    // Use the ingredients parameter in the API URL
    const apiUrl = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&${ingredients}&app_id=${edamamApiId}&app_key=${edamamApiKey}&field=uri&field=image&field=url&field=ingredientLines&field=calories&field=totalTime&field=cuisineType&field=mealType`;
  //  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredients}&app_id=${edamamApiId}&app_key=${edamamApiKey}&cuisineType=American&mealType=Dinner&dishType=Main%20course&imageSize=REGULAR&random=false&field=ingredients`;

    console.log('apiUrl:', apiUrl);
    const response = await axios.get(apiUrl);
    const recipes = response.data;
    console.log('API response:', response.data);

    

    res.json({ recipes });
  } catch (error) {
    console.error('Error fetching recipes from Edamam:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
