import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ExamQuizRoutes } from '../modules/examQuiz/examQuiz.route';
import { ParticipationRoutes } from '../modules/participation/participation.route';
import { ResultRoutes } from '../modules/result/result.route';
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
  {
    path: '/quizzes',
    route: ExamQuizRoutes,
  },
  {
    path: '/participation',
    route: ParticipationRoutes,
  },
  {
    path: '/results',
    route: ResultRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
