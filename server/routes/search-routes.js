import { Router } from 'express';
const router = Router();

import { validateQuery } from '../utils/utils.js';
import { find, findAll } from '../controllers/search-controller.js';
import { findFullText, findFullTextAll } from '../controllers/full-text-search-controller.js';
import { findFuzzyText, findFuzzyTextAll } from '../controllers/fuzzy-ft-search-controller.js';

router.get('/suggestions', validateQuery, find);
router.get('/', validateQuery, findAll);

router.get('/fulltext/suggestions', validateQuery, findFullText);
router.get('/fulltext/', validateQuery, findFullTextAll);

router.get('/fuzzy/suggestions', validateQuery, findFuzzyText);
router.get('/fuzzy/', validateQuery, findFuzzyTextAll);

export default router;