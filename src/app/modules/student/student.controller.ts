import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await StudentServices.createStudentIntoDb(studentData);
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDb();
    res.status(200).json({
      success: true,
      message: 'students are fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: 'student is fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { student: studentData } = req.body;
    const result = await StudentServices.updateStudentIntoDb(id, studentData);
    res.status(200).json({
      success: true,
      message: 'student is updated successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: 'student is deleted successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
