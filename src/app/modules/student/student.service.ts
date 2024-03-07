import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDb = async (studentData: TStudent) => {
  if (await Student.isStudentExists(studentData.id)) {
    throw new Error('Student already exists');
  }
  const result = await Student.create(studentData);
  return result;
};

const getAllStudentFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const updateStudentIntoDb = async (id: string, student: TStudent) => {
  const result = await Student.findOneAndUpdate({ id }, student, {
    new: true,
  });
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne(
    { id },
    {
      isDeleted: true,
    },
  );
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentFromDb,
  getSingleStudentFromDb,
  updateStudentIntoDb,
  deleteStudentFromDb,
};
