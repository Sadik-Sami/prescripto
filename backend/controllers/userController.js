import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// API to register a new user
const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		// validating required fields
		if (!name || !email || !password) {
			return res.json({
				success: false,
				message: 'Please provide all required fields.',
			});
		}
		// validating email
		if (!validator.isEmail(email)) {
			return res.json({
				success: false,
				message: 'Please provide a valid email address.',
			});
		}
		// validating password
		if (password.length < 8) {
			return res.json({
				success: false,
				message: 'Password must be at least 8 characters long.',
			});
		}
		// hashing user password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		// creating user object
		const userData = {
			name,
			email,
			password: hashedPassword,
		};
		const newUser = new userModel(userData);
		// saving user to database
		const user = await newUser.save();
		// _id is the unique identifier of the user

		// creating token for the user
		// and setting it as a jwt signed token inside an object witk key 'id'
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		res.json({
			success: true,
			message: 'User registered successfully.',
			token,
		});
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			message:
				error.code === 11000 ? 'Email already registered.' : error.message,
		});
	}
};
// API for user login
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		//Todo: validating required fields

		// if (!email || !password) {
		// 	return res.json({
		// 		success: false,
		// 		message: 'Please provide all required fields.',
		// 	});
		// }

		// Todo: validating email

		// if (!validator.isEmail(email)) {
		// 	return res.json({
		// 		success: false,
		// 		message: 'Please provide a valid email address.',
		// 	});
		// }

		// Todo: finding user in database

		// const user = await userModel.findOne({ email });
		// if (!user) {
		// 	return res.json({
		// 		success: false,
		// 		message: 'User not found.',
		// 	});
		// }

		// Todo: comparing passwords

		// const isMatch = await bcrypt.compare(password, user.password);
		// if (!isMatch) {
		// 	return res.json({
		// 		success: false,
		// 		message: 'Incorrect password.',
		// 	});
		// }

		// Todo: creating token for the user

		// const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		// res.json({
		// 	success: true,
		// 	message: 'User logged in successfully.',
		// 	token,
		// });
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.json({
				success: false,
				message: 'User not found.',
			});
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
			res.json({
				success: true,
				message: 'User logged in successfully.',
				token,
			});
		} else {
			res.json({
				success: false,
				message: 'Invalid Credentials.',
			});
		}
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error.message });
	}
};
// API to get user profile data
const getProfile = async (req, res) => {
	try {
		const { userId } = req.body;
		const userData = await userModel.findById(userId).select('-password');
		res.json({ success: true, userData });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error.message });
	}
};
export { registerUser, loginUser, getProfile };
