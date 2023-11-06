// basic requires
const express = require('express');

// accesses the schema of the model for "car". Remove the ".js" if it still doesn't work, I added it after
const LikeSchema = require('../models/likes.js');

// Initialize the router
const router = express();

// Get all
router.get('/api/like_get_all/', async (req, res) => {
    const findOrder = await LikeSchema.find();
    res.json(findOrder);
});

// Get Single
router.get('/api/like_get_single/:id', async (req, res) => {
    const findOrder = await LikeSchema.findById(req.params.id)
    res.json(findOrder)
});

// Update
router.put('/api/like_update/:id', async (req, res) => {
    const id  = req.params.id;
    await LikeSchema.findByIdAndUpdate(id, req.body)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
});

// Create
router.post('/api/like_add/', async (req, res) => {
    const car = new LikeSchema({

        userID: req.body.userID,
        questionID: req.body.questionID,
        type: req.body.type

    });
    await car.save()
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error)) // status 500 is an internal service error
});

//Delete
router.delete('/api/like_delete/:id', async (req, res) => {
    await LikeSchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
});

module.exports = router;