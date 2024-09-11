import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateSchema = 
  (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res
        .status(400)
        .json(error.issues.map((e) => ({ path: e.path[0], message: e.message })));
      }
      return res.status(409).json({
        status: 'failed',
        error: error,
      });
    }
  }