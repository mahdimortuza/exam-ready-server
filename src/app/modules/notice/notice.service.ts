import { TNotice } from './notice.interface';
import { Notice } from './notice.model';

const createNoticeIntoDb = async (payload: TNotice) => {
  const result = await Notice.create(payload);
  return result;
};

const getAllNoticesFromDb = async () => {
  const result = await Notice.find();
  return result;
};

const getSingleNoticeFromDb = async (id: string) => {
  const result = await Notice.findById({ _id: id });
  return result;
};

const updateNoticeIntoDb = async (id: string, payload: Partial<TNotice>) => {
  const result = await Notice.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteNoticeFromDb = async (id: string) => {
  const result = await Notice.findOneAndDelete({ _id: id });
  return result;
};

export const NoticeServices = {
  createNoticeIntoDb,
  getAllNoticesFromDb,
  getSingleNoticeFromDb,
  updateNoticeIntoDb,
  deleteNoticeFromDb,
};
