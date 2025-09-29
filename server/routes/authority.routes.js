
import { 
    createAuthorityProfile, 
    getAuthoritiesByCity, 
} from '../controllers/authorityController.js'; 

const router = express.Router();

// CREATE: Register a new authority profile
router.post('/', createAuthorityProfile);

// READ: Get authorities serving a specific city
// Example: /api/authorities?city=Ghaziabad
router.get('/', getAuthoritiesByCity); 

// // UPDATE: Update operational status and available units
// router.patch('/:id/status', updateOperationalDetails);

// // UPDATE: Update the current latitude and longitude
// router.patch('/:id/location', updateAgencyLocation); 

// // (Optional: You might also add a GET /:id route here to fetch a single profile)

export default router;