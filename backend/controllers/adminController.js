import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';

// Api for adding doctors
const addDoctor = async (req, res) => {
	try {
		const {
			name,
			email,
			password,
			speciality,
			degree,
			experience,
			about,
			fees,
			address,
		} = req.body;
		const imageFile = req.file;
		// checking for all data to add doctor
		if (
			!email ||
			!password ||
			!speciality ||
			!degree ||
			!experience ||
			!about ||
			!fees ||
			!address ||
			!imageFile
		) {
			return res.json({
				success: false,
				message: 'Please provide all required fields.',
			});
		}
		// validating email format
		if (!validator.isEmail(email)) {
			return res.json({
				success: false,
				message: 'Please enter a valid email',
			});
		}
		// validating password format
		if (password.length < 8) {
			return res.json({
				success: false,
				message: 'Please enter a strong password.',
			});
		}
		// encrypt password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		// upload image in cloudinary
		const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
			resource_type: 'image',
		});
		const imageUrl = imageUpload.secure_url;
		const doctorData = {
			name,
			email,
			image: imageUrl,
			password: hashedPassword,
			speciality,
			degree,
			experience,
			address: JSON.parse(address),
			date: Date.now(),
			about,
			fees,
		};
		const newDoctor = new doctorModel(doctorData);
		await newDoctor.save();
		res.json({ success: true, message: 'Doctor added successfully!' });
	} catch (err) {
		console.log(err);
		res.json({ success: false, message: err.message });
	}
};
// API for the admin login
const loginAdmin = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (
			email === process.env.ADMIN_EMAIL &&
			password === process.env.ADMIN_PASSWORD
		) {
			const token = jwt.sign(email+password, process.env.JWT_SECRET)
			res.json({ success: true, token });
		}
		else {
			res.json({ success: false, message: 'Invalid Credentials' });
		}
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error.message });
	}
};

export { addDoctor, loginAdmin };
