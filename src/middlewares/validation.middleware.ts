import { Request, Response, NextFunction } from 'express';

function validateChessInput(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { start, end } = req.body;

  if (!start || !end || !Array.isArray(start) || !Array.isArray(end)) {
    res.status(400).json({
      message:
        'Invalid input format. Expected start and end positions as arrays.',
    });
    return;
  }

  next();
}

export default validateChessInput;
