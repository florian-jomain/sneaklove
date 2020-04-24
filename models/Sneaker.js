const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Tag = require('./Tag');

const sneakerSchema = new Schema({
    name: String,
    ref: String,
    sizes: {
        type: [String],
        enum: ['34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44']
    },
    description: String,
    price: Number,
    category: {
        type: [String],
        enum: ['men', 'women', 'kids']
    },
    id_tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    image: String,
});

const Sneaker = mongoose.model("Sneaker", sneakerSchema);

module.exports = Sneaker;