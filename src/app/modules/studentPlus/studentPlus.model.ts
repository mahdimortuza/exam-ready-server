import { Schema, model } from 'mongoose';
import {
  StudentPlusModel,
  TStudentPlus,
  TStudentPlusName,
} from './studentPlus.interface';

const studentPlusNameSchema = new Schema<TStudentPlusName>({
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

const studentPlusSchema = new Schema<TStudentPlus, StudentPlusModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: studentPlusNameSchema,
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
studentPlusSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + this?.name?.lastName;
});

studentPlusSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentPlusSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentPlusSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
studentPlusSchema.statics.isStudentExists = async function (email: string) {
  const existingStudent = await StudentPlus.findOne({ email });
  return existingStudent;
};

export const StudentPlus = model<TStudentPlus, StudentPlusModel>(
  'StudentPlus',
  studentPlusSchema,
);
