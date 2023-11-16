import { Prisma, PrismaClient } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import Redis from "ioredis";

const redis = new Redis({
    port: 10704,
    host: "redis-10704.c83.us-east-1-2.ec2.cloud.redislabs.com",
    username: "default",
    password: "PCs13Ho0xxHjkIO0HdMJlqTv0DdwnMyw",
    db: 0
});
const prisma = new PrismaClient();

const cacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
  models: [
    { model: "User" },
    { model: "List" },
    { model: "Board" },
    { model: "Card" },
    { model: "Attachment" },
    { model: "Comment" },
    { model: "Invite" },
    { model: "Label" },
  ],
  storage: { type: "redis", options: { client: redis, invalidation: { referencesTTL: 500 } } },
  cacheTime: 500,
});

prisma.$use(cacheMiddleware);

export default prisma;
