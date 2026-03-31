import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function notFoundHandler(_request: Request, response: Response) {
  response.status(404).json({
    ok: false,
    error: "Route not found"
  });
}

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof ZodError) {
    return response.status(400).json({
      ok: false,
      error: "Validation failed",
      details: error.flatten()
    });
  }

  if (error instanceof Error) {
    return response.status(500).json({
      ok: false,
      error: error.message
    });
  }

  return response.status(500).json({
    ok: false,
    error: "Unexpected server error"
  });
}
