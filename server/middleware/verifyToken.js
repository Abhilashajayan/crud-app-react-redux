const { compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const verifyUser = async (req, res, next) => {
    let token = req.header("Authorization");
    if (!token) {
        return res.redirect('/login');
      }
    
      try {
        const verifyUsers = jwt.verify(token, secretKey);
  
        console.log(verifyUsers);
        req.admin = verifyUsers.admin;
        next();
      } catch (err) {
        res.redirect('/login');
        console.log(err);
      }

}

module.exports = verifyUser;


