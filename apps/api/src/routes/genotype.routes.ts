import { Router } from "express";
import { z } from "zod";
import { getCompatibilityResult } from "../lib/genotype";

const schema = z.object({
  partnerA: z.enum(["AA", "AS", "SS"]),
  partnerB: z.enum(["AA", "AS", "SS"]),
});

export const genotypeRouter = Router();

genotypeRouter.post("/check", (request, response) => {
  const body = schema.parse(request.body);
  const result = getCompatibilityResult(body.partnerA, body.partnerB);

  response.status(200).json({
    data: result,
  });
});
