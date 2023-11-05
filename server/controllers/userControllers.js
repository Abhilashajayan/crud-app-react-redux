const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const user = require('../models/userSchema');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userReg = async (req, res) => {
    const { name ,password , email } = req.body;
    try{
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        const newUser = new user({
            name,
            email,
            password: passwordHash,
        });
        const Users = await newUser.save();
        
        return res.status(200).json(Users);

    }catch(err)
        {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
        }

}

const userLogin = async (req, res) => {
    const { email , password } = req.body;
    console.log(email);
    try{    
        const users = await user.findOne({email: email});
        
        if(!users)
        {
            if (!user) return res.status(400).json({ error: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, users.password);
        const payload = {
            userId: users._id,
            username: users.name,
            };
            console.log(payload);
            const secretKey = process.env.SECRET_KEY; 
            const token = jwt.sign(payload, secretKey, { expiresIn: '5m' }); 
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials! Try again" });

       return res.status(200).json({ users , token });


    }catch(err){
        res.status(500).json({ error: err.message });
    }
}



module.exports = {
    userReg,
    userLogin
}