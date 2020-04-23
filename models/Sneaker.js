const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
    name: String,
    ref: String,
    sizes: {
        type: String,
        enum: ['36', '37', '38', '39', '40', '41', '42', '43', '44']
    },
    description: String,
    price: Number,
    category: {
        type: String,
        enum: ['men', 'women', 'kids']
    },
    id_tags: [ObjectId],
    image: String,
});

const Sneaker = mongoose.model("Sneaker", sneakerSchema);

module.exports = Sneaker;