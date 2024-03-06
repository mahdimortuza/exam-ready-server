import { Schema, model } from 'mongoose';
import { TStudent, TStudentName } from './student.interface';

const studentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
  },
  name: {
    type: studentNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  contactNo: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  isPaid: {
    type: String,
    enum: ['paid', 'unpaid'],
  },
});

export const StudentModel = model<TStudent>('Student', studentSchema);
