import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import { AppError } from '../../errors/AppError';
import { TExamSyllabus } from './examSyllabus.interface';

const syllabusSchema = new Schema<TExamSyllabus>(
  {
    syllabusName: {
      type: String,
      required: [true, 'Name is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    detail: {
      type: String,
      required: [true, 'Detail is required'],
    },
    createdBy: {
      type: String,
      required: [true, 'Admin email is required'],
      // ref: 'Student',
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

syllabusSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

syllabusSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

syllabusSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// preventing duplication
syllabusSchema.pre('save', async function (next) {
  const isSyllabusExists = await Syllabus.findOne({
    syllabusName: this.syllabusName,
  });

  if (isSyllabusExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This syllabus already exists');
  }
  next();
});

// update only if the subject name exists
syllabusSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isSyllabusExists = await Syllabus.findOne(query);

  if (!isSyllabusExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Syllabus name does not exists.',
    );
  }
  next();
});

export const Syllabus = model<TExamSyllabus>('Syllabus', syllabusSchema);
