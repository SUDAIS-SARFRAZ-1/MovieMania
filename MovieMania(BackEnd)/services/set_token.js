const jwt = require("jsonwebtoken");
const jwt_secret_key = "THIS-AWP-PROJECT-IS-CREATED-BY-SUDAIS-L1F22BSSE0235&&HANZALA-L1F22BSSE0236";

function set_token_to_user(user){
   try {
    const token = jwt.sign(
        { _id: user._id, username:user.username ,email: user.email }, 
        jwt_secret_key, 
        { expiresIn: "12h" }
    );
    
    return token;
   } catch (error) {
        console.error("JWT Generation Error:", error.message);
        return null;
   }
}


function verify_token(token) {
    try {
        if (!token) throw new Error("No token provided");
        const decoded = jwt.verify(token, jwt_secret_key);
        return decoded;
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return { error: error.message };
    }
}


module.exports={
    set_token_to_user,
    verify_token
}