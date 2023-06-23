const bcrypt  =  require("bcrypt")
const SALT_ROUNDS = 10;

async function hashPassword(user) {
  if (!user.password) throw user.invalidate('password', 'password is required');
  if (user.password.length < 6) throw user.invalidate('password', 'password must be at least 6 characters');
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  return user 
}


module.exports={
    hashPassword
}