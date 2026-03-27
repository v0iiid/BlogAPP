import { prisma } from "../lib/prisma.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await prisma.notification.findMany({
            where: {
                recieverid: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                post: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                comment: {
                    select: {
                        id: true,
                        content: true,
                    },
                },
            },
        });

        res.status(200).json({
            success: true,
            data: notifications,
        });

    } catch (error) {
        console.error("getNotifications failed ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
