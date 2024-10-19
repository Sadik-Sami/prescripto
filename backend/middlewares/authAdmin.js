import jwt from 'jsonwebtoken';

// admin authentication middleware
const authAdmin = async (req, res, next) => {
	try {
		const { atoken } = req.headers;
		// The atoken will be sent in the header of the request and it will be converted to a smaller case word so we used atoken instead of Atoken
		if (!atoken) {
			return res.json({
				success: false,
				message: 'Not Authorized Login Again',
			});
		}
		const token_Decode = jwt.verify(atoken, process.env.JWT_SECRET);
		if (token_Decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
			return res.json({
				success: false,
				message: 'Not Authorized Login Again',
			});
		}
		next();
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error.message });
	}
};
export default authAdmin;
