const mongoose = require('mongoose')

const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 100,
        require: [true, 'Please add a title']
    },
    content: {
        type: String,
        maxlength: 1000,
        require: [true, 'Please add some text']
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = { Article }