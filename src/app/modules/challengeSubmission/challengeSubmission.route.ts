import express from 'express';
import { ChallengeSubmissionController } from './challengeSubmission.controller';
const router = express.Router();

router.post('/submit', ChallengeSubmissionController.submitChallengeSubmission);

router.get('/', ChallengeSubmissionController.getAllChallengeSubmission);

router.get(
  '/:createdBy',
  ChallengeSubmissionController.getStudentChallengeSubmission,
);

router.delete('/:id', ChallengeSubmissionController.deleteChallengeSubmission);

export const ChallengeSubmissionRoutes = router;
