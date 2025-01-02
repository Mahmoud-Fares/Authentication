import { RequestHandler, Response, Router } from "express";
import { OAuthRequest } from "types/auth.types";
import passport from "../config/passport";
import { generateTokenPair, setTokenCookies } from "../services/token.service";

const router = Router();

// Google OAuth routes
router.get(
   "/google",
   passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
   "/google/callback",
   passport.authenticate("google", { session: false }),
   (async (req: OAuthRequest, res: Response) => {
      try {
         const user = req.user;
         if (!user) throw new Error("Authentication failed");

         const tokens = generateTokenPair({
            userId: user._id!.toString(),
            email: user.email,
         });

         setTokenCookies(res, tokens);

         // Redirect to frontend
         res.redirect(process.env.FRONTEND_URL_NEXT + "/");
      } catch (error) {
         res.redirect(
            process.env.FRONTEND_URL_NEXT + "/login?error=auth_failed"
         );
      }
   }) as RequestHandler
);

export default router;
