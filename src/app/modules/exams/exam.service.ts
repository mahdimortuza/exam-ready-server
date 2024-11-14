import cron from 'node-cron';
/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { TExam } from './exam.interface';
import { Exam } from './exam.model';

const createNewExamIntoDb = async (quizzesData: TExam) => {
  const result = await Exam.create(quizzesData);
  return result;
};

const getAllExamsFromDb = async (query: Record<string, unknown>) => {
  // Correct the populate reference to 'questions'
  const examQuery = new QueryBuilder(Exam.find().populate('questions'), query); // Use 'questions' instead of 'ExamQuiz'
  const meta = await examQuery.countTotal();
  const result = await examQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleExamFromDb = async (id: string) => {
  const result = await Exam.findOne({ _id: id }).populate('questions');
  return result;
};

const updateExamQuizIntoDb = async (id: string, payload: TExam) => {
  const result = await Exam.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const updateStatusIntoDb = async (id: string, payload: { status: string }) => {
  const result = await Exam.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// Helper function to format the time (HH:mm)
const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0'); // Local hours
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Local minutes

  return `${hours}:${minutes}`;
};

// Helper function to get the local date string (YYYY-MM-DD)
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
  const day = date.getDate().toString().padStart(2, '0'); // Day of the month

  return `${year}-${month}-${day}`;
};

// Function to update exam statuses based on the current date/time in Dhaka time zone
const updateExamStatuses = async () => {
  try {
    // Create a new Date object for the current time in Dhaka (Asia/Dhaka timezone)
    const dhakaTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Dhaka',
    });
    const dhakaDate = new Date(dhakaTime); // Convert it to a Date object

    const currentTime = formatTime(dhakaDate); // Local time in Dhaka formatted as HH:mm
    const currentDateString = formatDate(dhakaDate); // Local date in Dhaka formatted as YYYY-MM-DD

    // console.log('Current Time in Dhaka:', currentTime); // Logs Dhaka time in HH:mm format
    // console.log('Current Date in Dhaka:', currentDateString); // Logs current date in YYYY-MM-DD format

    // Find exams that are "upcoming" and need to be updated to "ongoing"
    const upcomingExams = await Exam.find({
      status: 'upcoming',
      startDate: currentDateString,
      startTime: { $lte: currentTime }, // Check if the current time is equal or after startTime
    });

    if (upcomingExams.length > 0) {
      // const updateToOngoing =
      await Exam.updateMany(
        { _id: { $in: upcomingExams.map((exam) => exam._id) } },
        { status: 'ongoing' },
      );
      // console.log('Ongoing Exams to update:', updateToOngoing);
    }

    // Find exams that are "ongoing" and need to be updated to "finished"
    const ongoingExams = await Exam.find({
      status: 'ongoing',
      endDate: currentDateString,
      endTime: { $lte: currentTime }, // Check if the current time is equal or after endTime
    });

    if (ongoingExams.length > 0) {
      // const updateToFinished =
      await Exam.updateMany(
        { _id: { $in: ongoingExams.map((exam) => exam._id) } },
        { status: 'finished' },
      );
      // console.log('Finished Exams to update:', updateToFinished);
    }
  } catch (error) {
    console.error('Error updating exam statuses:', error);
  }
};

// Cron job every minute to check and update statuses
cron.schedule('*/1 * * * *', () => {
  // console.log('Cron job is running every 2 minutes');
  updateExamStatuses();
});

export const ExamServices = {
  createNewExamIntoDb,
  getAllExamsFromDb,
  getSingleExamFromDb,
  updateExamQuizIntoDb,
  updateStatusIntoDb,
};
