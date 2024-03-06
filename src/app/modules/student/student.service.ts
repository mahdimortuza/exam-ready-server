import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDb = async (student: TStudent) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

const updateStudentIntoDb = async (id: string, student: TStudent) => {
  const result = await StudentModel.findOneAndUpdate({ id }, student, {
    new: true,
  });
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await StudentModel.deleteOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentFromDb,
  getSingleStudentFromDb,
  updateStudentIntoDb,
  deleteStudentFromDb,
};
