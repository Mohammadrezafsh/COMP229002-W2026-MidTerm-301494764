const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
    {
        title: {
            type: String,
            required: 'Title is required',
            unique: true,
            trim: true
        },
        author: {
            type: String,
            required: 'Author is required',
            trim: true
        },
        publisher: {
            type: String,
            trim: true
        },
        price: Number,
        publication_date: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        updated: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "books"
    }
);

// Ensure virtual fields are serialised.
BookSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) { 
        delete ret._id;
    }
});

module.exports = mongoose.model("Book", BookSchema);