import express from 'express';
import chessRoutes from './routes/chess.route';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/chess', chessRoutes);
app.use(errorMiddleware);

export default app;
