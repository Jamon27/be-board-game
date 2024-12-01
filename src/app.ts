import express from 'express';
import chessRoutes from './routes/chess.route';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
app.use('/api/chess', chessRoutes);
app.use(errorMiddleware);

export default app;
