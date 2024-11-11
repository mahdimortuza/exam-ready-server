import { TCurrentAffairs } from './currentAffairs.interface';
import { CurrentAffairs } from './currentAffairs.model';

const createCurrentAffairIntoDb = async (payload: TCurrentAffairs) => {
  const result = await CurrentAffairs.create(payload);
  return result;
};

const getAllCurrentAffairsFromDb = async () => {
  const result = await CurrentAffairs.find();
  return result;
};

const getSingleCurrentAffairsFromDb = async (id: string) => {
  const result = await CurrentAffairs.findById({ _id: id });
  return result;
};

const updateCurrentAffairsIntoDb = async (
  id: string,
  payload: Partial<TCurrentAffairs>,
) => {
  const result = await CurrentAffairs.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCurrentAffairsIntoDb = async (id: string) => {
  const result = await CurrentAffairs.findOneAndDelete({ _id: id });
  return result;
};

export const CurrentAffairsServices = {
  createCurrentAffairIntoDb,
  getAllCurrentAffairsFromDb,
  getSingleCurrentAffairsFromDb,
  updateCurrentAffairsIntoDb,
  deleteCurrentAffairsIntoDb,
};
