import { SosRequest } from '../models/SosRequest.js';

// ==========================================================
// 1. Controller for Generating a New SOS Request (CREATE)
// HTTP Method: POST /api/sos
// ==========================================================
export const createSosRequest = async (req, res) => {
    const { latitude, longitude, urgency_level, members, disaster_type } = req.body;

    if (latitude === undefined || longitude === undefined) {
        return res.status(400).json({ 
            message: "Both latitude and longitude are mandatory to create an SOS request." 
        });
    }

    try {
        const newSosRequest = await SosRequest.create({
            latitude,
            longitude,
            urgency_level, // Defaults to 'Critical'
            members,       // Defaults to 1
            disaster_type, // Defaults to 'Other'
            // status is auto-set to 'Pending' by the schema default
        });

        // Respond with 201 Created status
        res.status(201).json({
            message: "New SOS request generated successfully. Status: Pending.",
            data: newSosRequest
        });

    } catch (error) {
        handleMongooseError(res, error);
    }
};

// ==========================================================
// 2. Controller for Retrieving ALL Pending SOS Requests (READ/QUERY)
// HTTP Method: GET /api/sos/pending
// ==========================================================
export const getPendingSosRequests = async (req, res) => {
    try {
        // Find all requests where status is 'Pending', 'Assigned', or 'Rescuing'
        // This is a common way to fetch ALL ACTIVE incidents for a dashboard.
        const activeStatuses = ['Pending', 'Assigned', 'Rescuing'];
        const pendingRequests = await SosRequest.find({ status: { $in: activeStatuses } })
                                               .sort({ createdAt: -1 }) // Sort by newest first
                                               .select('-__v'); 

        res.status(200).json({
            message: "Active (Pending, Assigned, or Rescuing) SOS requests retrieved.",
            count: pendingRequests.length,
            data: pendingRequests
        });

    } catch (error) {
        handleMongooseError(res, error);
    }
};

// ==========================================================
// 3. Controller for Retrieving Single SOS Request Details (READ)
// HTTP Method: GET /api/sos/:id
// ==========================================================
export const getSosRequestDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const sosRequest = await SosRequest.findById(id).select('-__v');

        if (!sosRequest) {
            return res.status(404).json({ message: "SOS Request details not found with the given ID." });
        }

        res.status(200).json({
            message: "SOS Request details retrieved successfully.",
            data: sosRequest
        });

    } catch (error) {
        handleMongooseError(res, error);
    }
};