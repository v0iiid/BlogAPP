import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";
import blogRoute from "./routes/blogRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import likeRouter from "./routes/likeRoutes.js";
import { prisma } from "./lib/prisma.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get("/test-db", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome To Bloggy");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Prisma connected successfully");

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(" DB connection failed:", error.message);
  }
};

startServer();
