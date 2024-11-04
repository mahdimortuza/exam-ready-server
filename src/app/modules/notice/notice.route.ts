import express from 'express';
import { NoticeController } from './notice.controller';
const router = express.Router();

router.post('/create-notice', NoticeController.createNotice);

router.get('/', NoticeController.getAllNotices);

router.get('/:id', NoticeController.getSingleNotice);

router.patch('/:id', NoticeController.updateNoticeIntoDb);
router.delete('/:id', NoticeController.deleteNotice);

export const NoticeRoutes = router;
