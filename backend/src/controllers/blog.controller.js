
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
   try {
    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const blogs = await prisma.post.findMany({
        skip,
        take: limit,
        orderBy:{
            createdAt:"desc"
        },
        include:{
            user:{
                select:{
                    name:true,
                    email:true,
                    id:true
            },
        },
    },
    })
    res.status(200).json({
        success:true,
        page,
        data:blogs,
    })
   } catch (error) {
    console.log("get all blogs fails");
    res.status(500).json({
        success:false,
        message:"Internal Server Error",
    })
   }

}
export const getBlogById  = async (req,res)=>{
        try {
            const { id } = req.params;
            const blog = await prisma.post.findUnique({
                where: {
                    id: parseInt(id),
                },
                include:{
                    user:true,
                }
            });
            if (!blog) {
                return res.status(404).json({
                    success: false,
                    message: "Blog not found",
                });
            }
            res.status(200).json({
                success: true,
                data: blog,
            });
        } catch (error) {
            console.log("get blog by id fails");
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
            })
        }
}
export const updateBlog  = async (req,res)=>{
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user.id;

        const blog = await prisma.post.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        if (blog.userid !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this blog",
            });
        }

        const updatedBlog = await prisma.post.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                content,
            },
        });

        res.status(200).json({
            success: true,
            data: updatedBlog,
        });

    } catch (error) {
        console.log("update blog fails");
            if (error.code === "P2002") {
            return res.status(400).json({
            success: false,
            message: "A blog with this title already exists",
            });
        }
    }
}
export const deleteBlog = async (req,res)=>{
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        const blog = await prisma.post.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

       console.log(blog.userid);
       console.log(userId);

        if (blog.userid !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this blog",
            });
        }

        await prisma.post.delete({
            where: {
                id: parseInt(id),
            },
        });

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        console.error("delete blog fails");
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
