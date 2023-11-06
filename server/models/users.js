const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

// Generate a JWT. In the .env file, on line 3, type:
// JWTPRIVATEKEY=anything
// You can use literally anything as the JWT key (as it uses whatever you type as an algorithm to generate a token)
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

const User = mongoose.model('User', UserSchema);

const validate = (data) => {
    const schema = joi.object({
        username: joi.string().required().label("Username"),
        email: joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        image: joi.string().required().label("Image")
    });
    return schema.validate(data)
};

module.exports = {User, validate};