import express from "express";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/error.middleware.js";
import { attchCorrelationMiddleware } from "./middlewares/correlationId.middleware.js";
import apiRouter from "./routes/index.js";

const app = express();

app.set(
    "json replacer",
    function (_key: string, value: unknown) {
        return typeof value === "bigint"
            ? value.toString()
            : value;
    }
);

app.use(express.json());
app.use(express.text());
app.use(cookieParser());

app.use(attchCorrelationMiddleware);

app.get(
    "/health",
    function (_req, res) {
        res.send({
            status: "OK"
        });
    }
);

app.use("/api", apiRouter);

app.use(errorHandler);

export { app };