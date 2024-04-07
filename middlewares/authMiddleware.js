import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';

//protected routes token base
export const requireSignIn = async (req,resp,next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
        
    } catch (error) {
        console.log(error);
    }

} 

// Admin access
export const isAdmin = async (req,resp,next) =>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            return resp.status(400).send({
                success:false,
                message:"Unauthorized Access"
            })
        }else{
            next();
        }
    } catch (error) {
        resp.status(401).send({
            success:false,
            message:"Error in admin middleware",
            error
        })
    }
}