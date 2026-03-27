import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import cookieParser from "cookie-parser";

export const authMiddleware = async (req, res, next) => {
  try {
    let token =
      req.cookies?.jwt ||
      req.headers.authorization?.split(" ")[1];


      console.log(token);


    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized Access" });
    }

     let decoded ;
     try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
     } catch (error) {
        return res.status(401).json({
            success:false,
            error:"Unauthorized Access - Invalid Token",
        })
     }

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.userid||decoded.id,
        },
        select:{
            id :true,
            name:true,
            email:true,

        }
    });

    if (!user) {
      return res.status(401).json({
         success: false,
          message: "User not found - Unauthorized access",
         });
    }

    req.user = user;
    next();
  }catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
