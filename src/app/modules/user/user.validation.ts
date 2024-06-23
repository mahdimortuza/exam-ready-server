import { z } from 'zod';
import { StudentRole, UserStatus } from './user.constants';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, 'Password can not be more than 20 characters.')
    .optional(),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

const changeStudentRoleValidationSchema = z.object({
  body: z.object({
    role: z.enum([...StudentRole] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
  changeStudentRoleValidationSchema,
};
