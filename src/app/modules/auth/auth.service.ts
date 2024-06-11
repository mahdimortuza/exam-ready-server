import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { Student } from '../student/student.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  // checking if user exists
  const isUserExists = await Student.findOne({ email: payload?.email });
  console.log(isUserExists);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found.');
  }

  return {};
};
export const AuthServices = {
  loginUser,
};
