import express, { Request, Response } from 'express';
import chessRoutes from './routes/chess.route';
import errorMiddleware from './middlewares/error.middleware';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/api/chess', chessRoutes);
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
