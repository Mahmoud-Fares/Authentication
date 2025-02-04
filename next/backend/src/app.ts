import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import passport from "./config/passport";
import errorHandler from "./middleware/errorHandler";
import routes from "./routes/index";
import { apiResponse } from "./utils/apiResponse";
import { connectToDb } from "./utils/dbConnect";
import { auth } from "./middleware/auth";

const app: Express = express();

// Middleware
app.use(
   cors({
      origin: [process.env.FRONTEND_URL_REACT!, process.env.FRONTEND_URL_NEXT!],
      credentials: true,
   })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Initialize passport
app.use(passport.initialize());

// Test Routes
app.get("/api/public", (_req, res) => {
   res.json({ message: "This is a public endpoint" });
});

app.get("/api/protected", auth, (_req, res) => {
   res.json({ message: "This is a protected endpoint" });
});

// Routes
app.use("/api", routes);

// Handle 404 for all non-existing routes
app.all("*", (_: Request, res: Response): void => {
   apiResponse.error({
      code: 404,
      message: "Resource not found",
      res,
   });
});

// Global error handler - Must be after routes
app.use(errorHandler);

// Connect to MongoDB
connectToDb();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
