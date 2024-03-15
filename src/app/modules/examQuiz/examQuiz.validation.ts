import { z } from 'zod';

const createExamQuizValidationSchema = z.object({
  body: z.object({
    subjectName: z.string(),
    question: z.string(),
    options: z.array(z.string()),
    correctOption: z.string(),
    description: z.string(),
    createdBy: z.string(),
  }),
});

export const examQuizValidations = {
  createExamQuizValidationSchema,
};
