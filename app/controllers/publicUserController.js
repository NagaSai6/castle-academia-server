const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function publicUserController() {
  return {
    async handleLogin(req, res) {
      let email = req.body.email;
      let password = req.body.password;

      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "invalid-email" });
      }

      let IsuserExist = await User.findOne({ email: email }).exec();

      if(IsuserExist){
        bcrypt.compare(password, IsuserExist.password).then((passwordCheck)=>{
            if(!passwordCheck) {
                return response.status(400).json({
                  message: "Passwords does not match",
                  error,
                });
              }

              let token = jwt.sign({IsuserExist},process.env.JWT_SECRET,{expiresIn : "48h"});
              return res.status(200).json({message : "logged-in-successfully",token, email : IsuserExist.email})

        }).catch((err)=>{
            return res.status(500).json({message : "incorrect password",err})
        })
        // true
        
      }else{
        // create an user generate a token and login
        
        let user = new User();

        user.email = email;

        user.password = await  bcrypt.hash(password,10);

        let savedUser = await user.save();

        if(savedUser){
            
            let token = jwt.sign({savedUser},process.env.JWT_SECRET,{expiresIn : "48h"});
            return res.status(200).json({message: "user created successfully",token,email :savedUser.email})
        }else{
            
            return res.status(500).json({message : "failed to save in db"})
        }
      }

    },
    handleUserFormSubmission(req, res) {
        
    },
  };
}

module.exports = publicUserController;
