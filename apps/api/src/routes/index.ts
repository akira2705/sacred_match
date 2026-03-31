import { Router } from "express";
import { authRouter } from "./auth.routes";
import { contentRouter } from "./content.routes";
import { genotypeRouter } from "./genotype.routes";
import { healthRouter } from "./health.routes";
import { publicRouter } from "./public.routes";

const router = Router();

router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/content", contentRouter);
router.use("/genotype", genotypeRouter);
router.use("/public", publicRouter);

export { router };
