import { TChallengeSubmission } from './challengeSubmission.interface';
import { ChallengeSubmission } from './challengeSubmission.model';

const submitChallengeSubmissionIntoDb = async (
  payload: TChallengeSubmission,
) => {
  const result = await ChallengeSubmission.create(payload);
  return result;
};

const getAllChallengeSubmissionFromDb = async () => {
  const result = await ChallengeSubmission.find();
  return result;
};

const getStudentChallengeSubmissionFromDb = async (createdBy: string) => {
  const result = await ChallengeSubmission.find({
    createdBy: createdBy,
  });
  return result;
};

const deleteChallengeSubmissionFromDb = async (id: string) => {
  const result = await ChallengeSubmission.findOneAndDelete({ _id: id });
  return result;
};

export const ChallengeSubmissionServices = {
  submitChallengeSubmissionIntoDb,
  getAllChallengeSubmissionFromDb,
  getStudentChallengeSubmissionFromDb,
  deleteChallengeSubmissionFromDb,
};
