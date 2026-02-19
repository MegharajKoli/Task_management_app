import type { Request, Response, NextFunction, RequestHandler} from "express";

export const asyncHandler = < P = any, ResBody = any, ReqBody = any,ReqQuery = any>(
    fn: (req: Request<P, ResBody, ReqBody, ReqQuery>,res: Response,next: NextFunction) => Promise<any>
  ): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req as any, res, next)).catch(next);
  };
