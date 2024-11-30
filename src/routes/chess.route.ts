import { Router } from 'express';
import ChessController from '../controllers/chess.controller';
import validateChessInput from '../middlewares/validation.middleware';

const router = Router();

router.post('/paths', validateChessInput, ChessController.calculatePaths);

export default router;
