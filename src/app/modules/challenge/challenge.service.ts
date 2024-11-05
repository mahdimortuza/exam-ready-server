import { TChallenge } from './challenge.interface';
import { Challenge } from './challenge.model';

const createChallengeIntoDb = async (payload: TChallenge) => {
  const result = await Challenge.create(payload);
  return result;
};

const getAllChallengesFromDb = async () => {
  const result = await Challenge.find();
  return result;
};

const getSingleChallengeFromDb = async (id: string) => {
  const result = await Challenge.findById({ _id: id });
  return result;
};

const updateChallengeIntoDb = async (
  id: string,
  payload: Partial<TChallenge>,
) => {
  const result = await Challenge.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteChallengeFromDb = async (id: string) => {
  const result = await Challenge.findOneAndDelete({ _id: id });
  return result;
};

export const ChallengeServices = {
  createChallengeIntoDb,
  getAllChallengesFromDb,
  getSingleChallengeFromDb,
  updateChallengeIntoDb,
  deleteChallengeFromDb,
};
