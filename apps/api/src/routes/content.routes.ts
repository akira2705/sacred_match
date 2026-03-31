import { Router } from "express";
import { landingContent } from "../data/content";

export const contentRouter = Router();

contentRouter.get("/landing", (_request, response) => {
  response.status(200).json({
    data: landingContent,
  });
});
