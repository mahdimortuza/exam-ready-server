import { Schema, model } from 'mongoose';
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
      ref: 'Students',
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

subjectNameSchema.pre('save', async function (next) {
  const isSubjectExists = await SubjectName.findOne({
    subjectName: this.subjectName,
  });

  if (isSubjectExists) {
    throw new Error('This subject already exists');
  }
  next();
});

export const SubjectName = model<TSubjectNames>(
  'SubjectName',
  subjectNameSchema,
);
