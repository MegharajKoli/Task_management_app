import { Request, Response, NextFunction } from "express";
import { z, ZodType } from "zod";

type ValidationSchemas = {
  body?:   ZodType<any>;
  params?: ZodType<any>;
  query?:  ZodType<any>;
};

export const validate = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);   
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }

      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.issues.map(issue => ({
            path:    issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      next(error);   
    }
  };
};