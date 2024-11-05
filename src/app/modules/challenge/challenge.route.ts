import express from 'express';
import { ChallengeController } from './challenge.controller';
const router = express.Router();

router.post('/create-challenge', ChallengeController.createChallenge);

router.get('/', ChallengeController.getAllChallenges);

router.get('/:id', ChallengeController.getSingleChallenge);

router.patch('/:id', ChallengeController.updateChallenge);

router.delete('/:id', ChallengeController.deleteChallenge);

export const ChallengeRoutes = router;
