import passport from "passport";
import {
   Strategy as GoogleStrategy,
   Profile,
   VerifyCallback,
} from "passport-google-oauth20";
import User, { IUser } from "../models/user.model";
import { createGoogleUser } from "../services/user.service";

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
         callbackURL: "/api/auth/google/callback",
         scope: ["profile", "email"],
      },
      async (
         _accessToken: string,
         _refreshToken: string,
         profile: Profile,
         done: VerifyCallback
      ) => {
         try {
            // Check if user already exists
            let user = await User.findOne({ email: profile.emails![0].value });

            // Create new user if doesn't exist
            if (!user) user = await createGoogleUser(profile);

            return done(null, user);
         } catch (error) {
            return done(error as Error, undefined);
         }
      }
   )
);

// Serialize user for the session
passport.serializeUser(
   (user: Express.User, done: (err: any, id?: unknown) => void) => {
      done(null, (user as any)._id);
   }
);

// Deserialize user from the session
passport.deserializeUser(
   async (id: string, done: (err: any, user?: IUser | null) => void) => {
      try {
         const user = await User.findById(id);
         done(null, user);
      } catch (error) {
         done(error, null);
      }
   }
);

export default passport;
