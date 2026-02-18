import { Request, Response, NextFunction } from "express";
import { z } from "zod";


export const globalErrorHandler=(err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); 

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  if (err instanceof z.ZodError) {
    return res.status(400).json({ errors: err.issues });
  }

  res.status(status).json({
    error: message,
  });
};
