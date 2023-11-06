// basic requires
const express = require('express');

// accesses the schema of the model for "car". Remove the ".js" if it still doesn't work, I added it after
const QuestionSchema = require('../models/question.js');
const LikeSchema = require('../models/likes.js');
const fs = require('fs');

// Initialize the router
const router = express();

const path = require('path');
const multer = require('multer');

// Get all - latest first
router.get('/api/question_get_all/', async (req, res) => {
    try {
        // Find questions and sort by the createdAt field in descending order
        const page = req.query.page || 1;
        const skip = (page - 1) * 5;
        const findQuestion = await QuestionSchema.find().sort({ _id: -1 }).skip(skip).limit(5);
        const totalEntries = await QuestionSchema.countDocuments();
        res.json({entries: findQuestion, totalEntries});
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "An error occurred while fetching questions" });
    }
});

//get all - descending likes
router.get('/api/questionslikesdesc/', async (req, res) => {
    try {
        // Find questions and sort by the createdAt field in descending order
        const questions = await QuestionSchema.aggregate([
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'questionID',
                    as: 'likes',
                },
            },
            {
                $project: {
                    _id: 1,
                    user: 1,
                    title: 1,
                    text: 1,
                    date: 1,
                    comments: 1,
                    image: 1,
                    tags: 1,
                    likesCount: { $size: '$likes' },
                },
            },
            {
                $sort: { likesCount: -1 },
            },
        ]);
        res.json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "An error occurred while fetching questions" });
    }
});

// Get Single
router.get('/api/question_get_single/:id', async (req, res) => {
    try {
        const findQuestionSingle = await QuestionSchema.findById(req.params.id)
        if (!findQuestionSingle) {
            res.status(404).json({ error: "Question not found" });
        } else {
            res.json(findQuestionSingle)
        }
    } catch (error) {
        console.log("Error fetching question", error);
        res.status(500).json({ error: "An error occured" })
    }

});

//search questions
router.get('/api/searchquestion/:search', async (req, res) => {
    try {
        const searchTerm = req.params.search;
        const questions = await QuestionSchema.find({
            $or: [
                { title: new RegExp(searchTerm, 'i') },
                { text: new RegExp(searchTerm, 'i') }
            ]
        });
        res.json(questions)
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "An error occurred while fetching questions" });
    }

});

//users questions
router.get('/api/userquestions/:userid', async (req, res) => {
    try {
        const id = req.params.userid
        const questions = await QuestionSchema.find({ user: id })
        res.json(questions)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
})


//Middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})

// Update
router.put('/api/question/:id', upload.single('image'), async (req, res) => {
    try {
        if (req.file) {
            let data = JSON.parse(req.body.data);
            const question = ({
                user: data.id,
                title: data.title,
                text: data.text,
                date: data.date,
                comments: data.comments,
                image: req.file.filename
            })
            await QuestionSchema.findByIdAndUpdate(req.params.id, question)
                .then(response => res.json(response))
                .catch(error => res.status(500).json(error))
        } else {
            let data = req.body;
            const question = ({
                user: data.id,
                title: data.title,
                text: data.text,
                date: data.date,
                comments: data.comments
            })
            await QuestionSchema.findByIdAndUpdate(req.params.id, question)
                .then(response => res.json(response))
                .catch(error => res.status(500).json(error))
        }
    } catch (error) {
        console.log("Error updating question", error);
        res.status(500).json({ error: "An error occured when updating" })
    }

});

// Create
router.post('/api/addquestion', upload.single('image'), async (req, res) => {
    try {
        let data = JSON.parse(req.body.data)
        if (req.file) {
            const question = new QuestionSchema({
                user: data.id,
                title: data.title,
                text: data.text,
                date: data.date,
                comments: data.comments,
                image: req.file.filename
            })
            await question.save()
                .then(response => res.json(response))
                .catch(error => res.status(500).json(error)) // status 500 is an internal service error
        } else {
            const question = new QuestionSchema({
                user: data.id,
                title: data.title,
                text: data.text,
                date: data.date,
                comments: data.comments,
                image: ""
            })
            await question.save()
                .then(response => res.json(response))
                .catch(error => res.status(500).json(error))
        }
    } catch (error) {
        console.log("Error creating question", error);
        res.status(500).json({ error: "An error occured when creating the question" })
    }

});

//Delete
router.delete('/api/question_delete/:id', async (req, res) => {
    try {
        const question = await QuestionSchema.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        if (question.image) {
            fs.unlink(`./images/${question.image}`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

        await question.deleteOne();
        res.status(201).json({ message: "Question deleted successfully!" });
    } catch (error) {
        console.error("Error deleting question: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;