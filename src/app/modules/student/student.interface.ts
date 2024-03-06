export type TStudentName = {
  firstName: string;
  lastName: string;
};

export type TStudent = {
  id: string;
  name: TStudentName;
  gender: 'male' | 'female';
  email: string;
  contactNo?: string;
  profileImage?: string;
  isPaid: 'paid' | 'unpaid';
};
