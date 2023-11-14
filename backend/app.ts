import helmet from "helmet";
import path from "path";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import express, { Express, Request, Response, NextFunction } from "express";

// Routers
import usersRouter from "./routes/usersRouter";
import listsRouter from "./routes/listsRouter";
import tasksRouter from "./routes/tasksRouter";
import cardsRouter from "./routes/cardsRouter";
import boardsRouter from "./routes/boardsRouter";
import labelsRouter from "./routes/labelsRouter";
import invitesRouter from "./routes/invitesRouter";
import commentsRouter from "./routes/commentsRouter";
import attachementsRouter from "./routes/attachementsRouter";

// Error handling
import AppError from "./utils/AppError";
import handleErrors from "./controllers/errorController";

const app: Express = express();

if (process.env.DEV_MODE == "dev") app.use(morgan("dev"));

const corsOptions: CorsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3030", "http://localhost:8080"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

// Serve static assets
app.use(express.static(path.join(__dirname, "public")));

// Parse cookies
app.use(cookieParser());

// The rate limiter is configured to serve 5000Req/Hour

// app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

app.use(helmet());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/lists", listsRouter);
app.use("/api/v1/cards", cardsRouter);
app.use("/api/v1/boards", boardsRouter);
app.use("/api/v1/labels", labelsRouter);
app.use("/api/v1/invites", invitesRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/attachements", attachementsRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Error 404 Not Found: http://{HOST}${req.originalUrl} does not exist`, 404));
});

app.use(handleErrors);

export default app;
