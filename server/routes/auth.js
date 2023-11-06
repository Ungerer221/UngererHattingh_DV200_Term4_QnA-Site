const router = require("express").Router();
const { User } = require("../models/users");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/api/auth", async (req, res) => {
    try {

        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const user2 = await User.findOne({ email: req.body.email });
        if (!user2) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user2.password
        )

        if (!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const token = user2.generateAuthToken();

        res.status(200).send({ data: token, message: "Logged in Successfully!" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const validate = (data) => {
    const Schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });

    return Schema.validate(data);
}

module.exports = router;