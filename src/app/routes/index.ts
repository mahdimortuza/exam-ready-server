import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { SubjectNameRoutes } from '../modules/subjectName/subjectName.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/subjects',
    route: SubjectNameRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
