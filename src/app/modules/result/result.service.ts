import { Participation } from '../participation/participation.model';

const getAllResultsFromDb = async () => {
  const result = await Participation.find();
  return result;
};

export const ResultServices = {
  getAllResultsFromDb,
};
