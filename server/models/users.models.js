import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userType: {
        type: String,
        enum: ['Citizen', 'Authority'],
        required: true,
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    fullName: {
        type: String,
        trim: true,
        // Required only if the userType is 'Citizen'
        required: function() {
            return this.userType === 'Citizen';
        }
    },
    // --- Authority Specific Fields ---
    agencyName: {
        type: String,
        trim: true,
        // Required only if the userType is 'Authority'
        required: function() {
            return this.userType === 'Authority';
        }
    },
    contactNumber: {
        type: String,
        trim: true,
        // Required only if the userType is 'Authority'
        required: function() {
            return this.userType === 'Authority';
        }
    }
}, {timestamps: true});


export const User = mongoose.model("User", userSchema);