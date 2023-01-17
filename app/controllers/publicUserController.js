const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const decode_jwt = require("jwt-decode");
const User = require("../models/User");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function publicUserController() {
  return {
    async handleLogin(req, res) {
      let email = req.body.email;
      let password = req.body.password;

      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "invalid-email" });
      }

      let IsuserExist = await User.findOne({ email: email }).exec();

      if (IsuserExist) {
        bcrypt
          .compare(password, IsuserExist.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return response.status(400).json({
                message: "Passwords does not match",
                error,
              });
            }
            let data = IsuserExist;

            let token = jwt.sign({ data }, process.env.JWT_SECRET, {
              expiresIn: "0.01h",
            });
            return res
              .status(200)
              .json({
                message: "logged-in-successfully",
                token,
                email: IsuserExist.email,
              });
          })
          .catch((err) => {
            return res.status(500).json({ message: "incorrect password", err });
          });
        // true
      } else {
        // create an user generate a token and login

        let user = new User();

        user.email = email;

        user.password = await bcrypt.hash(password, 10);

        let savedUser = await user.save();

        if (savedUser) {
          let data = savedUser;
          let token = jwt.sign({ data }, process.env.JWT_SECRET, {
            expiresIn: "0.01h",
          });
          return res
            .status(200)
            .json({
              message: "user created successfully",
              token,
              email: savedUser.email,
            });
        } else {
          return res.status(500).json({ message: "failed to save in db" });
        }
      }
    },
    handleUserFormSubmission(req, res) {
      return res.status(200).json({ message: req.body });
      const msg = {
        to: "nagasai317@gmail.com", // Change to your recipient
        from: "ch18b053@smail.iitm.ac.in", // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async handleGoogleSignIn(req, res) {
      if (!req.body.token) {
        return res.status(403).json({ message: "invalid_entry" });
      }
      let token = req.body.token;
      let decoded_user_data = decode_jwt(token);

      try {
        let user = await User.findOne({
          "google.email": decoded_user_data.email,
        });
        if (user) {
          let signedToken = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          return res.status(200).json({ data: signedToken });
        } else {
          ///
          const googleUser = new User();
          googleUser.google.name = decoded_user_data.name;
          googleUser.google.email = decoded_user_data.email;
          googleUser.google.details.picture = decoded_user_data.picture;

          googleUser
            .save()
            .then((user) => {
              try {
                let signedToken = jwt.sign({ user }, process.env.JWT_SECRET, {
                  expiresIn: "1h",
                });
                return res.status(200).json({ data: signedToken });
              } catch (error) {
                console.log(error);
                return res
                  .status(500)
                  .json({ message: "failed_server_operation" });
              }
            })
            .catch((err) => {
              return res
                .status(500)
                .json({ message: "failed_server_operation" });
            });

          ///
        }
      } catch (error) {
        console.log(error);
      }
    },
    homePage(req, res) {
      return res.status(200).json({ message: "Backend server is Good" });
    },
  };
}

module.exports = publicUserController;
