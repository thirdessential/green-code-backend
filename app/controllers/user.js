 
 const userService  =  require("../services/user")
 const {hashPassword} = require("../utility")
const getUsers= async (req, res) => {
		try {
			// const id = req.params.id
			// const product = await getProduct(id)
			res.json("working")
		}
		catch (err) {
		res.status(500).send(err)
		}
	}
const createUsers =  async (req, res) => {

	try {
		const {body} =  req
		body = await  hashPassword(body)
		const user  =   await userService.create(body)
		res.status(200).send({
			user:user
		})
	}
	catch (err) {
	res.status(500).send(err)
	}
}

 
module.exports={
	createUsers,
	getUsers
}