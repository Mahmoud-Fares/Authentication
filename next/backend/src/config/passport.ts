import passport from "passport";
import {
   Strategy as GoogleStrategy,
   Profile,
   VerifyCallback,
} from "passport-google-oauth20";
import User from "../models/user.model";
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

export default passport;
