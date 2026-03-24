
import { prisma } from "../lib/prisma.js";

export const createBlog  = async (req,res)=>{
    try {
        const { title, content } = req.body;
        const userId = req.user.id;
        console.log(userId);

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required",
            });
        }

        const newBlog  = await prisma.post.create({
            data:{
                title,
                content,
                userid:userId,
            }
        })
        res.status(201).json({
            success:true ,
            data :newBlog,
        })

    } catch (error) {
        console.log("create blog fails");
          if (error.code === "P2002") {
            return res.status(400).json({
            success: false,
            message: "A blog with this title already exists",
            });
        }
    }
}
export const getAllBlogs  = async (req,res)=>{
    const blogs = await prisma.post.findMany({
        include:{
            user:{
                select:{
                    id:true,
                    name:true,
                    email:true,
                }
            }
        }
    });
}
export const getBlogById  = async (req,res)=>{

}
export const updateBlog  = async (req,res)=>{

}
export const deleteBlog = async (req,res)=>{

}
