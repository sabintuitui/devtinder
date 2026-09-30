const express = require("express");

const app = express();

app.get("/user/:userId", (req, res)=>{
    console.log(req.params);
    res.send("Get Response from the server")
});

app.post("/user", async (req, res) =>{
    res.send("Post Request from the server")
});

app.delete("/user", (req, res) =>{
    res.send("Delete data from db")
})

app.listen(3000, () =>{
console.log("Server is running,,")});