import jwt from 'jsonwebtoken';

// user authentication middleware
const authUser = async (req, res, next) => {
	try {
		const { token } = req.headers;
		if (!token) {
			return res.json({
				success: false,
				message: 'Not Authorized login again',
			});
		}
		const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
		req.body.userId = tokenDecode.id; //userid was inside the token as an object
		next();
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: 'Not Authorized login again' });
	}
};
export default authUser;
