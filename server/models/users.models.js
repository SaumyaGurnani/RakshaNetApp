import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userType: {
        type: String,
        enum: ['Citizen', 'Authority'],
        required: true,
        index: true
    },

    // Geospatial Location (Common to both Citizen and Authority)
    // CRITICAL: Stored as GeoJSON 'Point' for 2dsphere indexing, enabling fast location queries.
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: function(v) {
                    return v.length === 2 && v[0] >= -180 && v[0] <= 180 && v[1] >= -90 && v[1] <= 90;
                },
                message: props => `${props.value} is not a valid GeoJSON coordinate pair [longitude, latitude]`
            }
        }
    },

    city: {
        type: String,
        trim: true,
        required: true
    },

    // --- Citizen Specific Fields ---
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

// CRITICAL: Define the 2dsphere index for high-performance geospatial queries.
userSchema.index({ location: '2dsphere' });

export const User = mongoose.model("User", userSchema);