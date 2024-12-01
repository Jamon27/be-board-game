import { Request, Response, NextFunction } from 'express';

// todo:
interface IChessRequest {
  startPosition: string;
  endPosition: string;
  chessPieceType: string;
  stepsLimit: number;
}

function validateChessInput(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { startPosition, endPosition, chessPieceType, stepsLimit } = req.body;

  if (
    !startPosition ||
    !endPosition ||
    !(typeof startPosition === 'string') ||
    !(typeof endPosition === 'string')
  ) {
    res.status(400).json({
      message:
        'Invalid input format. Expected startPosition and endPosition as strings.',
    });
    return;
  }

  if (!chessPieceType || !(typeof chessPieceType === 'string')) {
    res.status(400).json({
      message: 'Invalid input format. Expected chessPieceType to be string.',
    });
    return;
  }

  if (!stepsLimit || !(typeof stepsLimit === 'number')) {
    res.status(400).json({
      message: 'Invalid input format. Expected stepsLimit to be number.',
    });
    return;
  }

  next();
}

export default validateChessInput;
