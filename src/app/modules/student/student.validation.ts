import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(12, { message: 'First name can not be more then 12 characters' }),
  lastName: z
    .string()
    .max(12, { message: 'Last name can not be more then 12 characters' }),
});
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: fullNameValidationSchema,
      gender: z.enum(['male', 'female']),
      email: z.string().email(),
      contactNo: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
