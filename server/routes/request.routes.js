
import { createRequest, updateRequestStatus } from '../controllers/requestController.js'; 

const router = express.Router();

router.post('/', createRequest);
router.patch('/:id', updateRequestStatus);

export default router;

/*
*** Route Mapping Analysis ***
1. **router.post('/', createRequest);** - **Method:** POST (Used for creating new resources).
   - **Endpoint:** `/api/requests` (When mounted in app.js).
   - **Action:** Calls the `createRequest` controller to generate a new request.

2. **router.patch('/:id', updateRequestStatus);**
   - **Method:** PATCH (Used for partially updating an existing resource).
   - **Endpoint:** `/api/requests/:id` (where `:id` is the Request's unique ID).
   - **Action:** Calls the `updateRequestStatus` controller to change the `status` of the request.
*/