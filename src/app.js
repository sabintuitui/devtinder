const express = require("express");
const connectDB = require("./config/db.js");
const app = express();
const User = require("./models/user.js");

//express auth which convert json to javascript obj
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User add Sucessfully...");
  } catch (err) {
    res.status(401).send("There is error " + err.message);
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
