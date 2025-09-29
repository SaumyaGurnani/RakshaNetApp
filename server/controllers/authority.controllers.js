import { AuthorityProfile } from '../models/AuthorityProfile.js'; // Adjust path as necessary

// ==========================================================
// 1. Controller for Creating a New Authority Profile (CREATE)
// HTTP Method: POST /api/authorities
// ==========================================================
export const createAuthorityProfile = async (req, res) => {
    const { 
        agencyName, 
        agencyType, 
        mainContactNumber, 
        serviceAreaCity, 
        latitude, 
        longitude, 
        operationalStatus, 
        availableUnits 
    } = req.body;

    if (!agencyName || !agencyType || !mainContactNumber || !serviceAreaCity || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ 
            message: "Missing essential required fields: agencyName, agencyType, mainContactNumber, serviceAreaCity, latitude, and longitude are mandatory." 
        });
    }

    try {
        // Mongoose's .create() handles uniqueness check and validation (e.g., required, enum)
        const newProfile = await AuthorityProfile.create({
            agencyName,
            agencyType,
            mainContactNumber,
            serviceAreaCity,
            latitude,
            longitude,
            operationalStatus, // Defaults to 'Active'
            availableUnits     // Defaults to 0
        });

        // Respond with 201 Created status
        res.status(201).json({
            message: `Authority profile for ${newProfile.agencyName} successfully created.`,
            data: newProfile
        });

    } catch (error) {
        handleMongooseError(res, error);
    }
};

// ==========================================================
// 2. Controller for Retrieving Authorities by City (READ/QUERY)
// HTTP Method: GET /api/authorities?city=...
// ==========================================================
export const getAuthoritiesByCity = async (req, res) => {
    // Use query parameters to filter by city
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ message: "City query parameter is required to search for authorities." });
    }

    try {
        // Find authorities serving the specified city (case-insensitive search is a good practice)
        const authorities = await AuthorityProfile.find({ 
            serviceAreaCity: { $regex: new RegExp(city, 'i') } 
        })
        .select('-__v -createdAt -updatedAt'); // Clean up the response

        if (authorities.length === 0) {
            return res.status(404).json({ 
                message: `No active authority profiles found serving the city: ${city}.` 
            });
        }

        res.status(200).json({
            message: `Successfully retrieved ${authorities.length} authorities in ${city}.`,
            count: authorities.length,
            data: authorities
        });

    } catch (error) {
        handleMongooseError(res, error);
    }
};