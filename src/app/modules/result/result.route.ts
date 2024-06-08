import express from 'express';
import { ResultController } from './result.controller';

const router = express.Router();

router.get('/', ResultController.getAllResults);

export const ResultRoutes = router;
