import { Request } from "../models/request.models.js";

// POST /api/requests
export const createRequest = async (req, res) => {
    const { fromAuthority, toAuthority, urgency, location, description } = req.body;

    if (!fromAuthority || !toAuthority || !location || !description) {
        return res.status(400).json({ 
            message: "Missing required fields: fromAuthority, toAuthority, location, and description are mandatory." 
        });
    }

    try {
        const newRequest = await Request.create({
            fromAuthority,
            toAuthority,
            urgency,
            location,
            description,
            // 'status' will automatically default to 'Pending' as defined in the schema
        });
        
        return res.status(201).json({
            message: "Resource request successfully generated.",
            data: newRequest
        });

    } catch (error) {
        console.error("Error creating request:", error);
        return res.status(500).json({ 
            message: "Server error during request creation.",
            error: error.message 
        });
    }
};

// PATCH /api/requests/:id
export const updateRequestStatus = async (req, res) => {
    const { id } = req.params;
    
    // 'status' can be 'Pending' (acknowledgment), or 'Fulfilled' (completion)
    const { status } = req.body; 

    const validStatuses = ['Pending', 'Fulfilled'];
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ 
            message: `Invalid or missing status provided. Status must be one of: ${validStatuses.join(', ')}.` 
        });
    }

    try {
        const updatedRequest = await Request.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true, runValidators: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: "Resource Request not found." });
        }

        let actionMessage = status === 'Fulfilled' ? "Request successfully fulfilled." : "Request status successfully updated (e.g., acknowledged).";

        return res.status(200).json({
            message: actionMessage,
            data: updatedRequest
        });

    } catch (error) {
        console.error("Error updating request status:", error);
        // Handle Mongoose CastError for invalid IDs
        if (error.kind === 'ObjectId') {
             return res.status(400).json({ message: "Invalid Request ID format." });
        }
        return res.status(500).json({ 
            message: "Server error during request status update.",
            error: error.message 
        });
    }
};

/*
*** Example Request Body (JSON) for Fulfillment ***

// PATCH /api/requests/60c72b2f9b1d8e0015a8c8e3

{
    "status": "Fulfilled" 
}
*/

/*
*** Example Request Body (JSON) ***

{
    "fromAuthority": "60c72b2f9b1d8e0015a8c8e1", // MongoDB ObjectId
    "toAuthority": "60c72b2f9b1d8e0015a8c8e2",   // MongoDB ObjectId
    "urgency": "High",                          // Optional, defaults to 'Moderate'
    "location": "Sector 14, City A",
    "description": "Need three paramedics and one ambulance immediately for a multi-vehicle accident."
}
*/