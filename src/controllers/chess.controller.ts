import { Request, Response } from 'express';
import ChessService from '../services/chess.service';

class ChessController {
  static async calculatePaths(req: Request, res: Response): Promise<void> {
    const { start, end } = req.body;
    const paths = await ChessService.calculatePaths();

    if (paths.length === 0) {
      res.status(404).json({ message: 'No solution found' });
    } else {
      res.status(200).json({ shortestPath: paths[0], allPaths: paths });
    }
  }
}

export default ChessController;
