const mongoose = require('mongoose')

const blogpostSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
    public: { type: Boolean, required: true }, 
    createdBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
})

const Blogpost = mongoose.model('Blogpost', blogSchema)

module.exports = Blogpost