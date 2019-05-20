const mongoose = require ('mongoose');
const Schema= mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true, //bat buoc phai co
        unique: true //la duy nhat
    },
    password: {
        type: String,
        required: true
    },
    avatar: String,
    name: String,
}, {
    timestamps: true
})

module.exports = mongoose.model ('user', UserSchema);