import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import { AppError } from '../../errors/AppError';
import { TStudent } from './student.interface';

const studentSchema = new Schema<TStudent>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
    },
    image: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Middleware for filtering out soft-deleted users
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Pre-save hook to prevent duplicate email
studentSchema.pre('save', async function (next) {
  const user = this as TStudent;

  // Check if an email already exists in the collection
  const existingUser = await Student.findOne({ email: user.email });

  if (existingUser) {
    const error = new AppError(
      httpStatus.BAD_REQUEST,
      'This email is already used.',
    );
    next(error); // Pass the error to the next middleware
  } else {
    next(); // No duplication, continue with save
  }
});

export const Student = model<TStudent>('Student', studentSchema);
