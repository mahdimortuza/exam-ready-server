import { z } from 'zod';

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: z.string(),
      email: z.string().email(),
      image: z.string().optional(),
    }),
  }),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      image: z.string().optional().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
