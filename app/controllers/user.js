
const userService = require("../services/user")
const otpService = require("../services/otp")
const bcrypt = require("bcrypt");
const { hashPassword, signJwt, GenrateOtp } = require("../utility");
const { mailOptions, mail } = require("../config/email");
const admin = require("../config/firebase")
const {OAuth2Client} = require('google-auth-library');
const {GOOGLE_CLIENT_ID} =require('../constansts')
const getMe = async (req, res) => {
	console.log(req.user)
	try {

		const user = await userService.getById(req.user.userId)
		// const product = await getProduct(id)
		res.json({
			user
		})
	}
	catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}
const sendOtp = async (req, res) => {
	try {
		const { username, type } = req.body;
		console.log(username)
		const oldData = await userService.getUserByUsername(username)
		console.log(oldData)
		if (oldData){
			return res.status(400).json(
				{ status: "already registerd with this email/phone " }
			)
		}
		if (type === "email") {
			const otp = GenrateOtp()
			mailOptions.email = username
			mailOptions.text = `your otp for registration is ${otp}`
			await mail.sendMail(mailOptions)
			await otpService.deleteByUsername(username)
			await otpService.create({
				username,
				type,
				otp
			})

			return res.json(
				{ status: "opt send successfully" }
			)
		} else if (type === "phone") {

			await otpService.deleteByUsername(username)
			await otpService.create({
				username,
				type,
				otp: "1234"
			})

			return res.json(
				{ status: "opt send successfully" }
			)
		}
		return res.status(400).json(
			{ status: "something went wrong " }
		)
	}
	catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}
const verifyOtp = async (req, res) => {
	try {
		const { username, otp } = req.body;

		const data = await otpService.getByUsername(username)

		if (data?.otp === otp) {
			await otpService.edit(username, { verified: true })


			return res.status(200).json(
				{ status: "opt verified  successfully" }
			)
		} else {


 
			return res.status(400).json(
				{ status: "please enter correct otp" }
			)
		}



	}
	catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}
const login = async (req, res) => {

	try {
		// read username and password from request body
		const { username, password } = req.body;
		const user = await userService.getUserByUsername(username)
		// filter user from the users array by username and password
		if (user) {
			if (user.provider !== "default") {
				return res.status(400).send(`User Already Registerd with ${user.provider}`);

			}
			bcrypt.compare(password, user.password, async function (err, isMatch) {
				if (err) {
					throw err
				} else if (!isMatch) {
					console.log("password incorrect!")
					return res.status(400).send('password incorrect!');
				} else {
					const accessToken = await signJwt(user)


					res.json({
						accessToken,
						user
					});
				}
			})
			// generate an access token

		} else {
			return res.status(400).send('Username or password incorrect');
		}
	}
	catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}
const createUser = async (req, res) => {

	try {
		let { body } = req

		const verified = await otpService.getByUsername(body.email ? body.email : body.phone)
		console.log(verified)
		if (verified?.verified) {
			
			if (body.phone) body.phoneVerified = true
			if (body.email) body.emailVerified = true
			const user = await userService.create(body)
			await otpService.deleteByUsername(body.email ? body.email : body.phone)
			const token = await signJwt(user)
			res.status(201).send({
				user: user,
				access_token: token
			})
		} else {
			res.status(400).send(
				`${body.email ? "email" : "number"} not verfied`
			)
		}

	}
	catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}
const updateUser = async (req, res) => {
	try {
		let { body } = req
		const user = await userService.edit(req.user.userId, body)

		res.status(200).send({
			user: user,
		})
	}
	catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}
const socialAuth = async (req, res) => {
	try {
		let { body } = req

		const data = await admin.auth().verifyIdToken(body.token);
        console.log(data)
		const oldData = await userService.getUserByUsername(data.email)
		console.log(oldData)
		if (oldData) {
			const token = await signJwt(oldData)
			res.status(200).send({
				user: oldData,
				access_token: token
			})
		} else {

			const newUser = await userService.create({
				emailVerified: true,
				email: data.email,
				name: data.name,
				uid: data.uid,
				isProfileCompleted:false,
				provider: data?.firebase?.sign_in_provider

			})
			const token = await signJwt(newUser)

			res.status(201).send({
				user: newUser,
				access_token: token
			})
		}


	}
	catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}
const socialAuthOneTap = async (req, res) => {
	try {
		let { body } = req
        
		const client = new OAuth2Client();
		const ticket = await client.verifyIdToken({
			idToken: body.token,
			audience: GOOGLE_CLIENT_ID, 
			
		});
		const payload = ticket.getPayload();
		const oldData = await userService.getUserByUsername(payload.email)
		console.log("oldData",oldData)
		if (oldData) {
			const token = await signJwt(oldData)
			res.status(200).send({
				user: oldData,
				access_token: token
			})
		} else {
			const newUser = await userService.create({
				emailVerified: true,
				email: payload.email,
				name: payload.name,
				isProfileCompleted:false,
				// uid: data.uid,
				provider: 'google'

			})
			const token = await signJwt(newUser)

			res.status(201).send({
				user: newUser,
				access_token: token
			})
		}

	}
	
	catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}


const sendOtpResetPassword = async (req, res) => {
	try {
		const { username, type } = req.body;
		const oldData = await userService.getUserByUsername(username)
		console.log(oldData,username)
		if (!oldData){
			return res.status(400).json(
				{ status: "invalid email/phone" }
			)
		}
		if (oldData.provider!=="default"){
			return res.status(400).json(
				{ status: "cannot reset password you are registred with "  +oldData.provideer+  "please try to login " }
			)
		}
		if (type === "email") {
			const otp = GenrateOtp()
			mailOptions.email = username
			mailOptions.text = `your otp for email is ${otp}`
			await mail.sendMail(mailOptions)
			await otpService.deleteByUsername(username)
			await otpService.create({
				username,
				type,
				otp
			})

			return res.json(
				{ status: "opt send successfully" }
			)
		} else if (type === "phone") {

			await otpService.deleteByUsername(username)
			await otpService.create({
				username,
				type,
				otp: "1234"
			})

			return res.json(
				{ status: "opt send successfully" }
			)
		}
		return res.status(400).json(
			{ status: "something went wrong " }
		)
	}
	catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}







const newPassword = async (req, res) => {
	try {
		const { username, otp,password } = req.body;
		const oldData = await userService.getUserByUsername(username)
		const data = await otpService.getByUsername(username)

		if (data?.otp === otp) {
			 await userService.edit(oldData?._id,{password:password})
			 await otpService.deleteByUsername(username)
			return res.status(200).json(
				{ status: "password changed successfully" }
			)
		} else {
			return res.status(400).json(
				{ status: "please enter correct otp" }
			)
		}



	}
	catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}


module.exports = {
	createUser,
	getMe,
	login,
	sendOtpResetPassword,
	sendOtp,
	verifyOtp,
	socialAuth,
	newPassword,
	updateUser,
	socialAuthOneTap
}