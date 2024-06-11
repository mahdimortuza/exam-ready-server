import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);

  // checking if user exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found.');
  }

  // checking if user exists
  // const isUserDeleted = isUserExists?.isDeleted;

  // if (isUserDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted.');
  // }

  // // checking if user is blocked
  // const userStatus = isUserExists?.status;

  // if (userStatus === 'blocked') {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked.');
  // }

  // checking if  the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    // access grunted
    throw new AppError(httpStatus.FORBIDDEN, 'Password did not match.');

  return {};
};
export const AuthServices = {
  loginUser,
};
