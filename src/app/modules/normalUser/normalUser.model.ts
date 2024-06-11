import { Schema, model } from 'mongoose';
import {
  NormalUserModel,
  TNormalUser,
  TNormalUserName,
} from './normalUser.interface';

const normalUserNameSchema = new Schema<TNormalUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
  },
});

const normalUserSchema = new Schema<TNormalUser, NormalUserModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: normalUserNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
    },
    contactNo: {
      type: String,
      trim: true,
    },
    collage: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual
normalUserSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + this?.name?.lastName;
});

normalUserSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

normalUserSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

normalUserSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
normalUserSchema.statics.isStudentExists = async function (email: string) {
  const existingStudent = await NormalUser.findOne({ email });
  return existingStudent;
};

export const NormalUser = model<TNormalUser, NormalUserModel>(
  'NormalUser',
  normalUserSchema,
);
