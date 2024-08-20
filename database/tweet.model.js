const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    content: {
        type: String,
        maxlength: 145,
        minlength: 1,
        required: true
    },
    username: { 
        type: String, 
        required: true 
    },
    url: {
        type: String,
        required: false // L'URL de la photo est facultative
    }
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
