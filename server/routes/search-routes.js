import { Router } from 'express';
const router = Router();

import { validateQuery } from '../utils/utils.js';
import { find, findAll } from '../controllers/search-controller.js';

router.get('/suggestions', validateQuery, find);
router.get('/', validateQuery, findAll);

export default router;