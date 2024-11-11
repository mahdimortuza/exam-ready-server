import express from 'express';
import { QuestionBankController } from './questionBank.controller';
const router = express.Router();

router.post('/create-question-bank', QuestionBankController.createQuestionBank);

router.get('/', QuestionBankController.getAllQuestionBanks);

router.get('/:id', QuestionBankController.getSingleQuestionBank);

router.patch('/:id', QuestionBankController.updateQuestionBank);

router.delete('/:id', QuestionBankController.deleteQuestionBank);

export const QuestionBankRoutes = router;
