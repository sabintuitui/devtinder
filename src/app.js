const express = require("express");
const connectDB = require("./config/db.js");
const app = express();

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
