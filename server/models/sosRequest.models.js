import mongoose from "mongoose";

const sosRequestSchema=new mongoose.Schema({
    latitude: { 
        type: Number, 
        required: true,
        min: -90, 
        max: 90 
    }, 
    longitude: { 
        type: Number, 
        required: true,
        min: -180, 
        max: 180 
    },
    urgency_level: {
        type: String,
        enum: ['Critical', 'High', 'Medium', 'Low'],
        default: 'Critical'
    },
    members: {
        type: Number,
        default: 1
    },
    disaster_type: {
        type: String,
        enum: ['Fire', 'Flood', 'Earthquake', 'Medical Emergency', 'Other'],
        default: 'Other'
    }
}, {timestamps: true});

export const SosRequest=mongoose.model("SosRequest", sosRequestSchema);