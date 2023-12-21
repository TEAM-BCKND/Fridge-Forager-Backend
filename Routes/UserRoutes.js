const express = require('express');
const User = require('../components/Users');
const Recipe = require('../components/Recipes');
const router = express.Router();


router.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
                                .populate('recipes')
                                .exec();
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});

router.post('/recipes', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        await newRecipe.save();


        const userId = req.body.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.recipes.push(newRecipe._id);
        await user.save();

        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch('/users/:userId', async (req, res) => {
    try {
        const updates = req.body; 
        const userId = req.params.userId;

        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch('/recipes/:recipeId', async (req, res) => {
    try {
        const updates = req.body;
        const recipeId = req.params.recipeId;

        const recipe = await Recipe.findByIdAndUpdate(recipeId, updates, { new: true });
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        res.json(recipe);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/recipes/:recipeId', async (req, res) => {
    try {
        const recipeId = req.params.recipeId;


        const recipe = await Recipe.findByIdAndDelete(recipeId);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }

        await User.updateMany(
            { recipes: recipeId },
            { $pull: { recipes: recipeId } }
        );

        res.send('Recipe deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;
