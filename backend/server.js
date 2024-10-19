import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectToDB from './config/mongodb.js';
import connectToCloudinary from './config/cloudinary.js';
import admindRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import { userRouter } from './routes/userRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4142;
connectToDB();
connectToCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/admin', admindRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
// localhost:5000/api/admin/add-doctor
app.get('/', (req, res) => {
	res.send('API is alive');
});
// start server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
