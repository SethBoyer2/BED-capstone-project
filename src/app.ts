import dotenv from "dotenv";
import express from "express";
import cors from "cors"


import { getCorsOptions } from "./config/corsConfig";
import { getHelmetConfig } from "./config/helmetConfig";


dotenv.config()

import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import trackRouter from "./api/v1/routes/trackRoutes";
import setupSwagger from "./config/swagger";
import adminRoutes from "./api/v1/routes/adminRoutes";


const app = express();

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

// Body parsing middleware
app.use(express.json());
app.use(cors(getCorsOptions()));
app.use(getHelmetConfig());
// API Routes
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1", trackRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

setupSwagger(app)
// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;
