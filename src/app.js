const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth.js");

//Middleware  which check admin request post, get, delete so Using USE

app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res)=>{
    res.send("Get data from user");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All data Send");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("delete Data");
});

//Mulitple route system
app.use(
  "/user", 
  (req, res, next) => {
    console.log("Response 1");
    //res.send("Response one");
    next();
  },
  (req, res, next) => {
    console.log("Response 2");
    //res.send("Response two");
    next();
  },
  (req, res) => {
    console.log("Response 3");
    res.send("Response 3");
  },
);
//dynamic routes
app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send("Get Response from the server");
});

app.post("/user", async (req, res) => {
  res.send("Post Request from the server");
});

app.delete("/user", (req, res) => {
  res.send("Delete data from db");
});

app.listen(3000, () => {
  console.log("Server is running,,");
});
