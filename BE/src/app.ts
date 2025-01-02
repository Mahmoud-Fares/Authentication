import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import session from "express-session";
import { AUTH_CONFIG } from "./config/auth.config";
import passport from "./config/passport";
import errorHandler from "./middleware/errorHandler";
import routes from "./routes/index";
import { apiResponse } from "./utils/apiResponse";
import { connectToDb } from "./utils/dbConnect";

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

// Session middleware only for OAuth routes
app.use(
   "/api/auth/google",
   session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
         ...AUTH_CONFIG.COOKIE_OPTIONS,
         maxAge: 60 * 1000, // 1 minute - just enough for OAuth flow
      },
   })
);

// Initialize passport
app.use(passport.initialize());
app.use("/api/auth/google", passport.session());

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
