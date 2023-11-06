// const express = require('express');
// const AnswerSchema = require('../models/answer.js');
// const router = express()

// require('dotenv/config')

// // const path = require('path');
// // const { error } = require('console');
// // const { response } = require('./question.js');

// // CRUD functionality

// // adding an answer 
// router.post('/api/add_Answer', async (req, res) => {
//     const answer = new AnswerSchema({ ...req.body })
//     await answer.save()
//         .then(response => res.json(response))
//         .catch(error => res.status(500).json(error))
// });

// // get all
// router.get('/api/answer_get_all/', async (req, res) => {
//     const findAnswer = await AnswerSchema.find();
//     res.json(findAnswer);
// })

// module.exports = router;