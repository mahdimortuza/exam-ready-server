export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'user';
  isPaid: 'paid' | 'unPaid';
  isDeleted: boolean;
};
