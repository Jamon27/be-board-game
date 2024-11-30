import { Request, Response, NextFunction } from 'express';

function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.status(500).json({ message: err.message });
}

export default errorMiddleware;
