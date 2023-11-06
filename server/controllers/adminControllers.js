const Admin =  require('../models/adminSchema');
const User = require('../models/userSchema');


const adminLogin = async (req, res) => {
    const { name , password } = req.body;
  try {
    
    const admin  = await Admin.findOne({ username : name });
    if (admin.username === name && admin.password === password) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Login failed');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (users) {
           return res.status(200).json({ users });
        } else {
            return res.status(400).json({ error: "User's Data Not Available" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    adminLogin,
    getUsers,
}