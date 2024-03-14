import { TSubjectNames } from './subjectName.interface';
import { SubjectName } from './subjectName.model';

const createSubjectNameIntoDb = async (subjectNameData: TSubjectNames) => {
  const result = await SubjectName.create(subjectNameData);
  return result;
};

export const SubjectNameServices = {
  createSubjectNameIntoDb,
};
