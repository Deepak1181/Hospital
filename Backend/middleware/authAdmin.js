// import jwt from "jsonwebtoken"
 

// //  admin authentication middleware


// const authAdmin = async ( req,res,next)=>{
    
//     // check if the token is valid 

//     try {
//         // get token first
//         const {atoken} = req.headers
//         if(!atoken) {
//             return res.json({success:false,message:"Not Authorized Login First"})
//         }
//         // verify token or decode it

//         const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)
//         if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
//             return res.json({success:false,message:"Not Authorized Login Again"})
//         }
//         next()
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// export default authAdmin






















import jwt from "jsonwebtoken";

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        // Get token from headers
           
     
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader); 

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login First." });
        }

        // Extract token
        // const token = authHeader.split(" ")[1];
        const atoken = authHeader.split(" ")[1].replace(/^"|"$/g, ''); 
        console.log("Extracted Token:", atoken); 

        // Verify token
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); 

        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Not Authorized. Login Again." });
        }

        req.admin = decoded;
        next();


        // const {atoken} = req.headers;
        // if(!atoken) {
        //     return res.json({success:false,message:"Not Authorized Login First"})
        // }
        // const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)
        // if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
        //     return res.json({success:false,message:"Not Authorized Login Again"})
        // }
        // next()

    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(401).json({ success: false, message: "Token verification failed. Login again." });
    }
};

export default authAdmin;









