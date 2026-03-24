import express from 'express';
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from "../controllers/blog.controller.js";
import { authMiddleware } from "../middlewares/auth.Middleware.js";

const blogRoute = express.Router();

blogRoute.post('/create',authMiddleware, createBlog);

blogRoute.get('/all', getAllBlogs);

blogRoute.get('/:id', getBlogById);

blogRoute.put('/:id', authMiddleware, updateBlog);

blogRoute.delete('/:id', deleteBlog);

export default blogRoute;
