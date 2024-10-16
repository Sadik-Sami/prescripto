import mongoose, { connect, mongo } from 'mongoose';
const connectToDB = async () => {
	mongoose.connection.on('connected', () => {
		console.log('Connected to MongoDB');
	});
	await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
};
export default connectToDB;
