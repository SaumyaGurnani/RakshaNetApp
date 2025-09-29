import mongoose from "mongoose";

const requestSchema=new mongoose.Schema({
    fromAuthority: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthorityProfile',
        required: true
    },
    toAuthority: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthorityProfile',
        required: true
    },
    urgency: {
        type: String,
        enum: ['Critical', 'High', 'Moderate', 'Low'],
        default: 'Moderate',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Fulfilled'],
        default: 'Pending',
        required: true
    },
    description: {
        type: String,
        required: true
    }

}, {timestamps: true});

export const Request=mongoose.model("Request",requestSchema);