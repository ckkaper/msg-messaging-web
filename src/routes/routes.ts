import { Router } from "express";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware";
import { protectedResourceMiddleware } from "../middlewares/protectedResourceMiddleware";

const router = Router();

router.get("/auth/login");

router.get("/", authorizationMiddleware, protectedResourceMiddleware);

export default router;
