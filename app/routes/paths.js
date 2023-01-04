const publicUserController = require("../controllers/publicUserController");


const paths = (app)=>{
   app.post("/sign-in",publicUserController().handleLogin);
   app.post("/send-mail",publicUserController().handleUserFormSubmission)
}

module.exports = paths;