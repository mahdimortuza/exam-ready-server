import { Types } from 'mongoose';

export type TSubjects = 'bangla' | 'english' | 'mathematics';

export type TSubjectNames = {
  subjectName: TSubjects;
  isDeleted: boolean;
  createdBy: Types.ObjectId;
};

// export interface SubjectNameModel extends Model<TSubjectNames> {
//   isSubjectNameExists(subjectName: string): Promise<TSubjectNames | null>;
// }
