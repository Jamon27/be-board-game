import { Response, NextFunction } from 'express';
import { IChessRequest } from '../controllers/chess.controller';

function validateChessInput(
  req: IChessRequest,
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

  if (
    stepsLimit === undefined ||
    stepsLimit === null ||
    !(typeof stepsLimit === 'number') ||
    isNaN(stepsLimit)
  ) {
    res.status(400).json({
      message: 'Invalid input format. Expected stepsLimit to be number.',
    });
    return;
  }

  if (!Number.isInteger(stepsLimit)) {
    console.log();
    res.status(400).json({
      message: 'Invalid input format. Expected stepsLimit to be integer value',
    });
    return;
  }

  if (stepsLimit < 0 || stepsLimit > 8) {
    res.status(400).json({
      message: 'Invalid input format. Expected stepsLimit to be from 1 to 5',
    });
    return;
  }

  next();
}

export default validateChessInput;
