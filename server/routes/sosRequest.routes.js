
import { 
    createSosRequest, 
    updateSosStatus, 
    getPendingSosRequests, 
    getSosRequestDetails 
} from '../controllers/sosRequestControllers.js'; 

const router = express.Router();

// 1. CREATE: Generate a new SOS request
router.post('/', createSosRequest);

// 2. READ: Get all active/pending/rescuing requests
router.get('/pending', getPendingSosRequests);

// 3. READ: Get details of a single request
router.get('/:id', getSosRequestDetails);

export default router;