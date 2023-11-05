const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
        name: {
            type: String,
            required: true,
            min: 2,
            max:50,
        },
        email : {
            type: String,
            required: true,
            max:50,
            unique: true
        },
        password : {
            type: String,
            required: true,
            min: 5,
        },
        picturePath: {
            type: String,
            
           
        },
    }, {timestamps: true}
);

module.exports = mongoose.model("users", userSchema);