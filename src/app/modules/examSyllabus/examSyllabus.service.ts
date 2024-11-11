import { TExamSyllabus } from './examSyllabus.interface';
import { Syllabus } from './examSyllabus.model';

const createSyllabusIntoDb = async (payload: TExamSyllabus) => {
  const result = await Syllabus.create(payload);
  return result;
};

const getAllSyllabusesFromDb = async () => {
  const result = await Syllabus.find();
  return result;
};

const getSingleSyllabusFromDb = async (id: string) => {
  const result = await Syllabus.findById({ _id: id });
  return result;
};

const updateSyllabusIntoDb = async (
  id: string,
  payload: Partial<TExamSyllabus>,
) => {
  const result = await Syllabus.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSyllabusIntoDb = async (id: string) => {
  const result = await Syllabus.findOneAndDelete({ _id: id });
  return result;
};

export const SyllabusServices = {
  createSyllabusIntoDb,
  getAllSyllabusesFromDb,
  getSingleSyllabusFromDb,
  updateSyllabusIntoDb,
  deleteSyllabusIntoDb,
};
