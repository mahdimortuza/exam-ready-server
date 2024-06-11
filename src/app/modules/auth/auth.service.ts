import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../config';
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
  const isUserDeleted = user?.isDeleted;

  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted.');
  }

  // checking if user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked.');
  }

  // checking if  the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    // access grunted
    throw new AppError(httpStatus.FORBIDDEN, 'Password did not match.');

  // create token and send to the client
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,

    config.jwt_access_secret as string,
    { expiresIn: '10d' },
  );

  return {
    accessToken,
  };
};
export const AuthServices = {
  loginUser,
};
