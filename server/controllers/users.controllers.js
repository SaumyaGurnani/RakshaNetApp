import { User } from '../models/User.js';

// ==========================================================
// 1. Controller for Creating a New User Profile (CREATE)
// HTTP Method: POST /api/users
// ==========================================================
export const createUser = async (req, res) => {
    // Destructure all fields from the request body
    const { userType, latitude, longitude, city, fullName, agencyName, contactNumber } = req.body;

    // Basic required validation (userType, location, city are always required)
    if (!userType || !latitude || !longitude || !city) {
        return res.status(400).json({ 
            message: "Missing essential required fields: userType, latitude, longitude, and city." 
        });
    }

    try {
        // Mongoose's .create() will run the conditional validation functions 
        // (for fullName, agencyName, contactNumber) automatically.
        const newUser = await User.create({
            userType,
            latitude,
            longitude,
            city,
            fullName, // Required for 'Citizen'
            agencyName, // Required for 'Authority'
            contactNumber // Required for 'Authority'
        });

        // Respond with the new resource and 201 Created status
        res.status(201).json({
            message: `${newUser.userType} profile successfully created.`,
            data: newUser
        });

    } catch (error) {
        // Handle potential validation errors due to conditional fields
        handleMongooseError(res, error);
    }
};

// ==========================================================
// 2. Controller for Retrieving a Single User Profile (READ)
// HTTP Method: GET /api/users/:id
// ==========================================================
export const getUserProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('-__v'); // Exclude the Mongoose version key

        if (!user) {
            return res.status(404).json({ message: "User profile not found with the given ID." });
        }

        res.status(200).json({
            message: "User profile retrieved successfully.",
            data: user
        });

    } catch (error) {
        handleMongooseError(res, error);
    }
};

// ==========================================================
// 3. Controller for Updating User Location (UPDATE/PATCH)
// HTTP Method: PATCH /api/users/:id/location
// ==========================================================
export const updateUserLocation = async (req, res) => {
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    // Validation for location fields
    if (latitude === undefined || longitude === undefined) {
        return res.status(400).json({ 
            message: "Both latitude and longitude are required for a location update." 
        });
    }
    
    // Ensure the values are numbers before trying to save
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({
            message: "Latitude and longitude must be numeric values."
        });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { latitude, longitude }, // Only update location fields
            { 
                new: true, // Return the document AFTER update
                runValidators: true // Ensures location types are numbers
            }
        ).select('-__v');

        if (!updatedUser) {
            return res.status(404).json({ message: "User profile not found for location update." });
        }

        res.status(200).json({
            message: "User location updated successfully.",
            data: updatedUser
        });

    } catch (error) {
        handleMongooseError(res, error);
    }
};

// ==========================================================
// 4. Controller for Getting All Authority Profiles (READ/QUERY)
// HTTP Method: GET /api/users/authorities
// ==========================================================
export const getAllAuthorities = async (req, res) => {
    try {
        // Find all documents where userType is 'Authority'
        const authorities = await User.find({ userType: 'Authority' }).select('-__v -createdAt');

        res.status(200).json({
            message: `Successfully retrieved ${authorities.length} Authority profiles.`,
            count: authorities.length,
            data: authorities
        });

    } catch (error) {
        handleMongooseError(res, error);
    }
};