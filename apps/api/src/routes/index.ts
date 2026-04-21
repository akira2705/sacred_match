import { Router } from "express";
import { authRouter } from "./auth.routes";
import { contentRouter } from "./content.routes";
import { genotypeRouter } from "./genotype.routes";
import { healthRouter } from "./health.routes";
import { intakeRouter } from "./intake.routes";
import { profileRouter } from "./profile.routes";
import { publicRouter } from "./public.routes";
import { verificationRouter } from "./verification.routes";

const router = Router();

router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/content", contentRouter);
router.use("/genotype", genotypeRouter);
router.use("/intake", intakeRouter);
router.use("/profile", profileRouter);
router.use("/public", publicRouter);
router.use("/verification", verificationRouter);

export { router };
