const express = require("express");
const connectDB = require("./config/db.js");
const app = express();
const User = require("./models/user.js");
const { validatorSignUp } = require("./utils/validator.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth.js");
//express auth which convert json to javascript obj
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validate the data first
    validatorSignUp(req);
    const { firstName, lastName, email, password } = req.body;

    //encryption password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("Users added sucessfully...");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Email is not correct");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "DevTinder123");
      res.cookie("token", token);
      res.send("Login Sucessfully");
    } else {
      throw new Error("Password is not Match");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if(!token){
      throw new Error("Invalid Token");
    }
    const isDecodeCookie = await jwt.verify(token, "DevTinder123");
    const { _id } = isDecodeCookie;
    const user = await User.findById(_id);
    if(!user){
      throw new Error("User Not found");
    }
    else{
      res.send(user);
    }
    
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//api call by email id
app.get("/users", async (req, res) => {
  const user = await User.find({ email: req.body.email });
  try {
    if (user.length === 0) {
      res.status(404).send("User Not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("There is something error");
  }
});

//feed API, GET /feed  get all users data into feed
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("There is something error");
  }
});

//api call by userId
app.get("/users", async (req, res) => {
  const userId = req.body.userID;
  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch (err) {
    res.status(400).send("There is something error");
  }
});

//delete API

app.delete("/users", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findOneAndDelete({ _id: userId });
    //const user = await User.findByIdAndDelete(userId);
    res.send("user delete sucessfully");
  } catch (err) {
    res.status(400).send("There is something error");
  }
});

app.patch("/users", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, data);
    res.send("data change sucessfully");
  } catch (err) {
    res.status(400).send("There is something error....");
  }
});

connectDB()
  .then(() => {
    console.log("Database connect sucess...");
    app.listen(3000, () => {
      console.log("Server is running,,");
    });
  })
  .catch((err) => {
    console.error("Database has error ...");
  });

// const { adminAuth, userAuth } = require("./middlewares/auth.js");

// //Middleware  which check admin request post, get, delete so Using USE
// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Something is error.");
//   }
// });
// app.get("/getData", (req, res) => {
//   throw new Error("Eroorss");
//   res.status(500).send("data error");
// });

// app.use("/admin", adminAuth);

// app.get("/user", userAuth, (req, res) =>{
//     res.send("User response");
// })

// app.get("/admin/getAllData", (req, res) => {
//   res.send("All data Send");
// });

// app.get("/admin/deleteUser", (req, res) => {
//   res.send("delete Data");
// });

// //Mulitple route system
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Response 1");
//     //res.send("Response one");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Response 2");
//     //res.send("Response two");
//     next();
//   },
//   (req, res) => {
//     console.log("Response 3");
//     res.send("Response 3");
//   },
// );
// //dynamic routes
// app.get("/user/:userId", (req, res) => {
//   console.log(req.params);
//   res.send("Get Response from the server");
// });

// app.post("/user", async (req, res) => {
//   res.send("Post Request from the server");
// });

// app.delete("/user", (req, res) => {
//   res.send("Delete data from db");
// });

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Something is error.ssssss");
//   }
// });
