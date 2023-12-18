
// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// async function recipieFetch (req, res)  {
//   try {
//     const { ingredients, allergies } = req.query;

//     // Replace YOUR_EDAMAM_APP_ID and YOUR_EDAMAM_APP_KEY with your actual credentials
//     const edamamAppId = '31776401';
//     const edamamAppKey = '3148d04f672974e3b528a338df4b1143';

//     const apiUrl = `https://api.edamam.com/search?q=${encodeURIComponent(
//       ingredients
//     )}&app_id=${edamamAppId}&app_key=${edamamAppKey}&from=0&to=10`;
   
//     // Add logic to filter by allergies if needed
//     if (allergies) {
//       apiUrl += `&health=${encodeURIComponent(allergies)}`;
//     }

//     const response = await axios.get(apiUrl);
//     const recipes = response.data.hits.map(hit => hit.recipe);

//     res.json({ recipes });
//   } catch (error) {
//     console.error('Error fetching recipes from Edamam:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// module.exports = recipieFetch;
