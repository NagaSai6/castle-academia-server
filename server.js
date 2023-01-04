require("dotenv").config();
const dbConnect = require("./app/DB/dbConnect");
const paths = require("./app/routes/paths");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors())
app.use(
  express.urlencoded({
    extended: false,
  })
);

// initiate db connection
dbConnect();

// routes
paths(app)

app.listen(process.env.PORT || 9000, () => {
  console.log("server is up on port 7000");
});
