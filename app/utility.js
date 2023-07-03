const bcrypt  =  require("bcrypt");
const { JWT_SECRET } = require("./constansts");
const otpGenerator = require('otp-generator')
const SALT_ROUNDS = 10;
const jwt = require("jsonwebtoken");
async function hashPassword(user) {
  if (!user.password) throw user.invalidate('password', 'password is required');
  if (user.password.length < 6) throw user.invalidate('password', 'password must be at least 6 characters');
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
}
async function hashChangePassword(user) {
  
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
}

async function signJwt(user){
 const  token = await  jwt.sign(
    { userId: user.id, email:  user?.email??user?.email,phone:user?.phone??user?.phone,role:user.userType },
    JWT_SECRET,
    { expiresIn: "1d" }
    )
    return token
}
 
const GenrateOtp =()=>{
 return  otpGenerator.generate(6, { lowerCaseAlphabets:false,upperCaseAlphabets: false, specialChars: false,digits:true });

} 


module.exports={
    hashPassword,
    hashChangePassword,
    GenrateOtp,
    signJwt
}