import express from 'express';
import {
	addDoctor,
	allDoctors,
	loginAdmin,
} from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const admindRouter = express.Router();
admindRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
admindRouter.post('/login', loginAdmin);
admindRouter.post('/all-doctors', authAdmin, allDoctors);
admindRouter.post('/change-availability', authAdmin, changeAvailability);

export default admindRouter;
