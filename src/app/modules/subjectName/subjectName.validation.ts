import { z } from 'zod';
import { Subjects } from './subjectName.constant';

const createSubjectNameValidationSchema = z.object({
  body: z.object({
    subjectName: z.enum([...Subjects] as [string, ...string[]]),
  }),
});

export default createSubjectNameValidationSchema;
