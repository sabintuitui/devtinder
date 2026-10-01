 const adminAuth =  (req, res, next) =>{
    console.log("Admin Auth running check");
    const token = "abcde";
    const isAdminAuth = token ==="abcdde";
    if(!isAdminAuth){
        res.status(401).send("Unauthorised Admin Password")
    }
    else{
        next();
    }
};

const userAuth =(req, res, next)=>{
    console.log("User auth running check");
    const token = "abcde";
    const isUserAuth = token === "abcde";
    if(!isUserAuth) {
        res.status(401).send("Unauthorized User");
    }
    else{
        next();
    }

}
module.exports= {
    adminAuth,
    userAuth,
}