const { Schema, model } = require('mongoose');
// const { v4: uuidv4 } = require('uuid'); 

const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'shops';

const shopSchema = new Schema({
    // _id: {
    //     type: String,
    //     default: uuidv4, // Automatically generate a unique string for _id
    // },
    name: {
        type: String,
        trim: true,
        maxLength: 150
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: []
    }
}, { timestamps: true, collection: COLLECTION_NAME })

module.exports = model(DOCUMENT_NAME, shopSchema);