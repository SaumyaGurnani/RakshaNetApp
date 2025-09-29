import mongoose from "mongoose";

const authorityProfileSchema = new mongoose.Schema({

    agencyName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        description: "Official name of the rescue agency (e.g., City Fire Department, County EMS)"
    },

    agencyType: {
        type: String,
        required: true,
        description: "The primary function of the agency"
    },

    
    mainContactNumber: {
        type: String,
        required: true,
        trim: true,
        description: "The primary dispatch or command center phone number"
    },

    serviceAreaCity: {
        type: String,
        required: true,
        index: true,
        description: "The primary city or region the agency serves"
    },

    // Optional static headquarters location (GeoJSON)
    headquartersLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
            description: "The fixed location of the main command center or base"
        }
    },

    // --- Operational Details ---
    operationalStatus: {
        type: String,
        enum: ['Active', 'Standby', 'Offline (Maintenance)', 'Reduced Capacity'],
        default: 'Active',
        description: "The current general readiness status of the agency"
    },

    availableUnits: {
        type: Number,
        default: 0,
        min: 0,
        description: "The total number of deployable units (vehicles, teams) currently available"
    },

   
    integrationKey: {
        type: String,
        unique: true,
        sparse: true, // Allows null values, enforces uniqueness only when present
        description: "Optional key for integration with external dispatch systems"
    }

}, {
    timestamps: true
});

authorityProfileSchema.index({ headquartersLocation: '2dsphere' });

export const AuthorityProfile = mongoose.model("AuthorityProfile", authorityProfileSchema);