const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Router = require("./route/userRoute");
const User = require("./model/user");
dotenv.config();

//   middleware
app.use(express.json());
app.use("/user", Router);
// check what i used it for in freecodecamp
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const users = await User.find()
    .then((user) => {
      res.render("test", { user });
      // console.log(user[0].name);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
