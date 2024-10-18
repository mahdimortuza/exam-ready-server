import { z } from 'zod';

const createExamQuizValidationSchema = z.object({
  body: z.object({
    subjectName: z.string({
      invalid_type_error: 'Subject name must be a string',
    }),
    question: z.string({
      invalid_type_error: 'Question must be a string',
    }),
    options: z.array(
      z.string({
        invalid_type_error: 'Options must be an array',
      }),
    ),
    correctOption: z.string({
      invalid_type_error: 'Correct option must be a string',
    }),
    description: z.string({
      invalid_type_error: 'Description must be a string',
    }),
    createdBy: z.string({
      invalid_type_error: 'Admin name must be a string',
    }),
  }),
});

export default createExamQuizValidationSchema;
