import { prisma } from "../lib/prisma.js";

export const createNotification = async ({
  type,
  senderid,
  recieverid,
  postid = null,
  commentid = null,
}) => {
  try {
    // for prevent self notification
    if (senderid === recieverid) return null;

    // 🔥 avoid duplicate like notifications
    if (type === "like") {
      const existing = await prisma.notification.findFirst({
        where: {
          type: "like",
          senderid,
          recieverid,
          postid,
        },
      });

      if (existing) return existing;
    }

    const notification = await prisma.notification.create({
      data: {
        type,
        senderid,
        recieverid,
        postid,
        commentid,
      },
    });

    return notification;

  } catch (error) {
    console.error("Notification Service Error:", error);
    return null;
  }
};
