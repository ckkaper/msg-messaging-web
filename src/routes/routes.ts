import { Router } from "express";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware";
import { protectedResourceMiddleware } from "../middlewares/protectedResourceMiddleware";
import authorizationCallbackMiddleware from "../middlewares/authorizationCallbackMiddleware";

const router = Router();

router.get("/unprotected", (req, res, _) => {
    res.send("welcomea");
});
router.get("/auth/login", (req, res, _) => {
    res.send("unprotected");
});
router.get("/auth/callback", authorizationCallbackMiddleware);

router.get("/", authorizationMiddleware, protectedResourceMiddleware);

export default router;
