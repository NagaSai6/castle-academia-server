const publicUserController = require("../controllers/publicUserController");
const premiumUserController = require("../controllers/premiumUserController");


const paths = (app)=>{
   app.get("/",publicUserController().homePage)
   app.post("/sign-in",publicUserController().handleLogin);
   app.post("/send-mail-form-submission",publicUserController().handleUserFormSubmission);
   app.post("/send-mail-chatbot",publicUserController().handleUserFormSubmission);

   // google sso 
   app.post('/google-sign-in',publicUserController().handleGoogleSignIn)
   // protected routes
   app.get("/courses-overview",premiumUserController().fetchCourses);
   app.get("/check-user-role",publicUserController().fetchUserRole)
}

module.exports = paths;