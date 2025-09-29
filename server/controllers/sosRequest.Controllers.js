import { SosRequest } from '../models/sosRequest.models.js';


export const createSosRequest = async (req, res) => {
    try {
        const { latitude, longitude, urgency_level, members, disaster_type } = req.body;

        if (!latitude || !longitude) {
             return res.status(400).json({ error: 'Location coordinates are mandatory.' });
        }
        
        // Calculate the objective priority score
        const deemed_priority = calculateDeemedPriority(urgency_level, members, disaster_type);
        
        const newSOS = new SosRequest({
            latitude, longitude, urgency_level, members, disaster_type,
            deemed_priority, // Saved for sorting
            status: 'Pending'
            // district_id defaults to 'KL-EKM'
        });

        await newSOS.save();
        
        // Output: Alert appears on the district dashboard with priority level.
        res.status(201).json({ 
            message: 'SOS successfully logged.', 
            sosId: newSOS._id,
            priority: newSOS.deemed_priority
        });

    } catch (err) {
        res.status(400).json({ error: 'Validation Error: ' + err.message });
    }
};


// ====================================================================
// Controller 2: READ PENDING (DEO Dashboard View) - Step 2: Assess Situation
// ====================================================================
export const getAllPendingSos = async (req, res) => {
    // Requires DEO role authentication (handled in routes middleware)
    try {
        // Use the district_id from the authenticated user (mocked in routes as KL-EKM)
        const districtId = req.user?.district_id || 'KL-EKM'; 

        const pendingSOS = await SosRequest.find({
            status: { $in: ['Pending', 'Assigned', 'Rescuing'] },
            district_id: districtId // Filter data by the DEO's operational area
        })
        .sort({ deemed_priority: -1, createdAt: 1 }) // CRUCIAL: Sort by highest priority first
        .limit(100); 

        res.json(pendingSOS);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch pending SOS list.' });
    }
};


// ====================================================================
// Controller 3: UPDATE ASSIGNMENT (DEO Action) - Step 3: Deploy Rescue Teams
// ====================================================================
export const assignTeamToSos = async (req, res) => {
    // Requires DEO role authentication
    try {
        const sosId = req.params.id;
        const { assigned_team_id } = req.body; 

        if (!assigned_team_id) {
            return res.status(400).json({ error: 'Team ID is required for assignment.' });
        }

        const updatedSOS = await SosRequest.findOneAndUpdate(
            { _id: sosId, status: 'Pending' }, // Find by ID and ensure it hasn't been assigned yet
            { 
                $set: { 
                    assigned_team_id: assigned_team_id,
                    status: 'Assigned' 
                }
            },
            { new: true } 
        );

        if (!updatedSOS) {
            return res.status(404).json({ error: 'SOS not found or already assigned/fulfilled.' });
        }

        res.json({ message: `SOS assigned to ${assigned_team_id}.`, sos: updatedSOS });

    } catch (err) {
        res.status(500).json({ error: 'Failed to assign team.' });
    }
};


// ====================================================================
// Controller 4: UPDATE STATUS (Team Action) - Step 4: Monitor & Update
// ====================================================================
export const updateSosStatus = async (req, res) => {
    // Requires Team role authentication
    try {
        const sosId = req.params.id;
        const { status } = req.body; 
        
        if (!['Rescuing', 'Fulfilled', 'Cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status update. Must be Rescuing, Fulfilled, or Cancelled.' });
        }
        
        const updateFields = { status };

        const updatedSOS = await SosRequest.findOneAndUpdate(
            { _id: sosId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedSOS) {
            return res.status(404).json({ error: 'SOS not found.' });
        }

        res.json({ message: `Status updated to ${status}.`, sos: updatedSOS });

    } catch (err) {
        res.status(500).json({ error: 'Failed to update status.' });
    }
};