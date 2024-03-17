import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import { AppError } from '../../errors/AppError';
import { Subjects } from './subjectName.constant';
import { TSubjectNames } from './subjectName.interface';

const subjectNameSchema = new Schema<TSubjectNames>(
  {
    subjectName: {
      type: String,
      enum: Subjects,
      required: [true, 'Subject name is required'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: [true, 'Admin name is required'],
      ref: 'Admin',
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

subjectNameSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

subjectNameSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

subjectNameSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// subjectNameSchema.statics.isSubjectNameExists = async function (
//   subjectName: string,
// ) {
//   const existingSubjectName = await SubjectName.findOne({ subjectName });
//   return existingSubjectName;
// };

// preventing duplication
subjectNameSchema.pre('save', async function (next) {
  const isSubjectExists = await SubjectName.findOne({
    subjectName: this.subjectName,
  });

  if (isSubjectExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This subject already exists');
  }
  next();
});

// update only if the subject name exists
subjectNameSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isSubjectExists = await SubjectName.findOne(query);

  if (!isSubjectExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Subject name does not exists.',
    );
  }
  next();
});

export const SubjectName = model<TSubjectNames>(
  'SubjectName',
  subjectNameSchema,
);
