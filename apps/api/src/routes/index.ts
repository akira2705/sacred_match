import { Router } from "express";
import { adminRouter } from "./admin.routes";
import { authRouter } from "./auth.routes";
import { connectionsRouter } from "./connections.routes";
import { contentRouter } from "./content.routes";
import { genotypeRouter } from "./genotype.routes";
import { healthRouter } from "./health.routes";
import { intakeRouter } from "./intake.routes";
import { messagingRouter } from "./messaging.routes";
import { profileRouter } from "./profile.routes";
import { publicRouter } from "./public.routes";
import { uploadRouter } from "./upload.routes";
import { verificationRouter } from "./verification.routes";

const router = Router();

router.use("/health", healthRouter);
router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/connections", connectionsRouter);
router.use("/content", contentRouter);
router.use("/genotype", genotypeRouter);
router.use("/intake", intakeRouter);
router.use("/messaging", messagingRouter);
router.use("/profile", profileRouter);
router.use("/public", publicRouter);
router.use("/upload", uploadRouter);
router.use("/verification", verificationRouter);

export { router };
