import { RequestHandler, Response, Router } from "express";
import { OAuthRequest } from "types/auth.types";
import passport from "../config/passport";
import { generateTokenPair, setTokenCookies } from "../services/token.service";

const router: Router = Router();

// Google OAuth routes
router.get(
   "/",
   passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
   "/callback",
   passport.authenticate("google", { session: false }),
   (async (req: OAuthRequest, res: Response) => {
      const user = req.user;

      if (!user) throw new Error("Authentication failed");

      const tokens = generateTokenPair({
         userId: user._id!.toString(),
         email: user.email,
      });

      setTokenCookies(res, tokens);

      // Redirect to frontend
      res.redirect(process.env.FRONTEND_URL_NEXT + "/");
   }) as RequestHandler
);

export default router;
