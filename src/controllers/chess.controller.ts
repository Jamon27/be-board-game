import { Request, Response } from 'express';
import { ChessService } from '../services/chess.service';
import { StandardChessboardMapper } from '../utils/chessboard-mapper.utils';
import { ChessPieceFactory } from '../utils/chess-piece-factory';

interface IChessRequestBody {
  startPosition: string;
  endPosition: string;
  chessPieceType: string;
  stepsLimit: number;
}

export interface IChessRequest extends Request {
  body: IChessRequestBody;
}

// ToDo: DI for service?
class ChessController {
  static async calculatePaths(
    req: IChessRequest,
    res: Response,
  ): Promise<void> {
    const { startPosition, endPosition, chessPieceType, stepsLimit } = req.body;

    try {
      const chessboardMapper = new StandardChessboardMapper();
      const chessPiece = ChessPieceFactory.create(
        chessPieceType,
        'black',
        startPosition,
        chessboardMapper,
      );

      const service = new ChessService(chessPiece, chessboardMapper);

      const { shortestPaths, allPaths } = service.calculatePath(
        endPosition,
        stepsLimit,
      );

      res.status(200).json({ shortestPaths, allPaths });
    } catch (e: unknown) {
      console.error(e);

      res.status(500).json((e as Error).toString());
    }
  }
}

export default ChessController;
