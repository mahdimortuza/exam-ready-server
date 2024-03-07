import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(12, { message: 'First name can not be more then 12 characters' }),
  lastName: z
    .string()
    .max(12, { message: 'Last name can not be more then 12 characters' }),
});
export const studentValidationSchema = z.object({
  id: z.string(),
  password: z.string(),
  name: fullNameValidationSchema,
  gender: z.enum(['male', 'female']),
  email: z.string().email(),
  contactNo: z.string().optional(),
  profileImage: z.string().optional(),
  isPaid: z.enum(['paid', 'unpaid']),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
