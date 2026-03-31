import { Router } from "express";
import { prisma } from "../lib/prisma";
import { ethnicGroupPreview, featuredResources, landingStats } from "../content/public-content";
import { getGenotypeCompatibility } from "../services/genotype.service";

const router = Router();

router.get("/overview", async (_request, response, next) => {
  try {
    const faqs = await prisma.faqEntry.findMany({
      where: {
        isFeatured: true
      },
      orderBy: {
        sortOrder: "asc"
      },
      take: 6
    });

    response.json({
      ok: true,
      data: {
        stats: landingStats,
        resources: featuredResources,
        faqs,
        ethnicGroups: ethnicGroupPreview
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get("/ethnic-groups", async (_request, response, next) => {
  try {
    const groups = await prisma.ethnicGroup.findMany({
      orderBy: {
        name: "asc"
      },
      take: 24
    });

    response.json({
      ok: true,
      data: groups
    });
  } catch (error) {
    next(error);
  }
});

router.get("/faqs", async (_request, response, next) => {
  try {
    const faqs = await prisma.faqEntry.findMany({
      orderBy: [{ sortOrder: "asc" }, { question: "asc" }]
    });

    response.json({
      ok: true,
      data: faqs
    });
  } catch (error) {
    next(error);
  }
});

router.get("/genotype/compatibility", (request, response) => {
  const left = String(request.query.left ?? "");
  const right = String(request.query.right ?? "");

  response.json({
    ok: true,
    data: getGenotypeCompatibility(left, right)
  });
});

export { router as publicRouter };
