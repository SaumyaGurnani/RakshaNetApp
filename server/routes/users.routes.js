
import { 
    createUser, 
    getUserProfile, 
    updateUserLocation, 
    getAllAuthorities 
} from '../controllers/users.controllers.js'; 

const router = express.Router();

// CREATE: Register a new user (Citizen or Authority)
router.post('/', createUser);

// READ: Get all Authorities
router.get('/authorities', getAllAuthorities);

// READ: Get single user profile by ID
router.get('/:id', getUserProfile);

// UPDATE: Update user's latitude and longitude
router.patch('/:id/location', updateUserLocation); 

export default router;