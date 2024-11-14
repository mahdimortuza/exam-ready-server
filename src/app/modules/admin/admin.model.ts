import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import { AppError } from '../../errors/AppError';
import { TAdmin } from './admin.interface';

const adminSchema = new Schema<TAdmin>(
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
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dkwnfybul/image/upload/fl_preserve_transparency/v1731612090/cat_lx230v.jpg?_s=public-apps',
    },
    contactNo: {
      type: String,
      trim: true,
      required: [true, 'Contact number is required'],
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

adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

adminSchema.pre('save', async function (next) {
  const admin = this as TAdmin;

  const existingAdmin = await Admin.findOne({ email: admin.email });
  if (existingAdmin) {
    const error = new AppError(
      httpStatus.BAD_REQUEST,
      'This email is already used.',
    );
    next(error);
  } else {
    next();
  }
});

// creating a custom static method
// adminSchema.statics.isAdminExists = async function (email: string) {
//   const existingAdmin = await Admin.findOne({ email });
//   return existingAdmin;
// };

export const Admin = model<TAdmin>('Admin', adminSchema);
