const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, pic } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please enter all the fields");
	}
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	} else {
		const user = await User.create({
			name: name,
			email: email,
			password: password,
			pic: pic,
		});
		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				password: user.password,
				pic: user.pic,
				token: generateToken(user._id),
			});
		} else {
			res.status(400);
			throw new Error("Failed to create the user");
		}
	}
});

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error("Please fill all the fields");
	}
	const user = await User.findOne({ email });
	if (!user) {
		res.status(400);
		throw new Error("Invalid email");
	} else {
		if (await user.matchPassword(password)) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				pic: user.pic,
				token: generateToken(user._id),
			});
		} else {
			res.status(400);
			throw new Error("Invalid password");
		}
	}
});

module.exports = { registerUser, authUser };
