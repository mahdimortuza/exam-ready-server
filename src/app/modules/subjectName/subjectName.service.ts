import { TSubjectNames } from './subjectName.interface';
import { SubjectName } from './subjectName.model';

const createSubjectNameIntoDb = async (payload: TSubjectNames) => {
  const result = await SubjectName.create(payload);
  return result;
};

const getAllSubjectNamesFromDb = async () => {
  const result = await SubjectName.find().populate('createdBy');
  return result;
};

const getSingleSubjectNameFromDb = async (id: string) => {
  const result = await SubjectName.findById({ _id: id });
  return result;
};

const updateSubjectNameIntoDb = async (
  id: string,
  payload: Partial<TSubjectNames>,
) => {
  const result = await SubjectName.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const SubjectNameServices = {
  createSubjectNameIntoDb,
  getAllSubjectNamesFromDb,
  getSingleSubjectNameFromDb,
  updateSubjectNameIntoDb,
};
