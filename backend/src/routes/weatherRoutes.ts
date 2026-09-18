import { Router } from 'express';
import { city, coordinates, forecast } from '../controllers/weatherController';
const router = Router();
router.get('/city/:city', city);
router.get('/coordinates', coordinates);
router.get('/forecast/:city', forecast);
export default router;
