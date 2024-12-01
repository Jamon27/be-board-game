import { Request, Response } from 'express';
import { ChessService } from '../services/chess.service';
import { Knight } from '../models/knight.model';
import { StandardChessboardMapper } from '../utils/chessboard-mapper.utils';

interface IChessRequestBody {
  startPosition: string;
  endPosition: string;
  chessPieceType: string;
  stepsLimit: number;
}

export interface IChessRequest extends Request {
  body: IChessRequestBody;
}

class ChessController {
  static async calculatePaths(
    req: IChessRequest,
    res: Response,
  ): Promise<void> {
    const { startPosition, endPosition, chessPieceType, stepsLimit } = req.body;

    try {
      const chessboardMapper = new StandardChessboardMapper();
      const knight = new Knight('black', startPosition, chessboardMapper);

      const service = new ChessService(knight, chessboardMapper);

      const { shortestPaths, allPaths } = await service.calculatePath(
        endPosition,
        stepsLimit,
      );

      res.status(200).json({ shortestPaths, allPaths });
    } catch (e: any) {
      console.error(e);

      res.status(500).json(e.toString());
    }
  }
}

export default ChessController;
