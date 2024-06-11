import { Schema, model } from 'mongoose';
import { AdminModel, TAdmin, TAdminName } from './admin.interface';

const adminNameSchema = new Schema<TAdminName>({
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

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: adminNameSchema,
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
adminSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + this?.name?.lastName;
});

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

// creating a custom static method
adminSchema.statics.isAdminExists = async function (email: string) {
  const existingAdmin = await Admin.findOne({ email });
  return existingAdmin;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
