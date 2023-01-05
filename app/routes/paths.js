const publicUserController = require("../controllers/publicUserController");


const paths = (app)=>{
   app.get("/",publicUserController().homePage)
   app.post("/sign-in",publicUserController().handleLogin);
   app.post("/send-mail-form-submission",publicUserController().handleUserFormSubmission);
   app.post("/send-mail-chatbot",publicUserController().handleUserFormSubmission)
}

module.exports = paths;