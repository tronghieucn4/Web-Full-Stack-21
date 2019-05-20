const mongoose = require ('mongoose');
const Schema= mongoose.Schema;

const PostSchema = new Schema({
    author: ObjectId,
    post: {
        type: String
    },
    view: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: true //yeu cau phai co
    },
    like: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model ('post', PostSchema);