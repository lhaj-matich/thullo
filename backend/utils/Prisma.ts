import { Prisma, PrismaClient } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import Redis from "ioredis";

const redis: any = new Redis({
    port: 10704,
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    db: 0
});

// const redis = new Redis();

const prisma = new PrismaClient();

const cacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
  models: [
    { model: "User", invalidateRelated: ["Board", "Card"] },
    { model: "List", invalidateRelated: ["Board"]},
    { model: "Board" },
    { model: "Card" },
    { model: "Attachment", invalidateRelated: ["Card"] },
    { model: "Comment", invalidateRelated: ["Card"]},
    { model: "Task", invalidateRelated: ["Card"]},
    { model: "Invite" },
    { model: "Label", invalidateRelated: ["Card"]},
  ],
  storage: { type: "redis", options: { client: redis, invalidation: { referencesTTL: 500 } } },
  cacheTime: 500,
});

prisma.$use(cacheMiddleware);

export default prisma;
