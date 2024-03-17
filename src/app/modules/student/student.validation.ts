import { z } from 'zod';

const createFullNameValidationSchema = z.object({
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
      name: createFullNameValidationSchema,
      gender: z.enum(['male', 'female']),
      email: z.string().email(),
      contactNo: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

const updateFullNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(12, { message: 'First name can not be more then 12 characters' })
    .optional(),
  lastName: z
    .string()
    .max(12, { message: 'Last name can not be more then 12 characters' })
    .optional(),
});
export const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: updateFullNameValidationSchema,
      gender: z.enum(['male', 'female']).optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional().optional(),
      profileImage: z.string().optional().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateFullNameValidationSchema,
};
